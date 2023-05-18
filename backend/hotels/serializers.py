from rest_framework.generics import get_object_or_404
from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    SerializerMethodField,
)
from rest_framework import serializers
from django.db.models import Min

from .models import (
    FAQ,
    Amenity,
    Hotel,
    Booking,
    HotelImages,
    HouseRules,
    Review,
    Room,
    RoomTemp,
    User,
    BookTemp,
)
from account_manager.serializers import Base64ImageField, UserDetailForReviewSerializer


class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

    def create(self, validated_data):
        print("here")
        user_id = validated_data.pop("user")
        hotel_id = validated_data.pop("hotel")
        user = get_object_or_404(User, pk=user_id)
        hotel = get_object_or_404(Hotel, pk=hotel_id)
        validated_data["user"] = user
        validated_data["hotel"] = hotel
        review = super().create(validated_data)
        return review


class HotelSerializer(ModelSerializer):
    hotel_images = serializers.SerializerMethodField()
    amenities = serializers.StringRelatedField(many=True, read_only=True)
    manager = serializers.StringRelatedField(read_only=True)
    review_count = serializers.SerializerMethodField()
    cheapest_price = serializers.SerializerMethodField()
    room_count = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "address",
            "amenities",
            "room_count",
            "manager",
            "rooms",
            "hotel_images",
            "hotel_score",
            "lng",
            "lat",
            "review_count",
            "cheapest_price",
        ]

    def get_hotel_images(self, obj):
        hotel_images = HotelImages.objects.filter(hotel=obj)
        return HotelImagesSerializer(hotel_images, many=True).data

    def get_review_count(self, obj):
        count = Review.objects.filter(hotel=obj).count()
        return count

    def get_cheapest_price(self, obj):
        cheapest_price = obj.rooms.aggregate(min_price=Min("price"))["min_price"]
        if cheapest_price:
            return cheapest_price
        else:
            return "N/A"

    def get_room_count(self, obj):
        rooms = Room.objects.filter(hotel=obj)
        count = 0
        for room in rooms:
            count = count + room.quantity

        return count

    def create(self, validated_data):
        # print(validated_data["manager"])

        amenities = validated_data.pop("amenities", [])
        print(validated_data)
        hotel = Hotel.objects.create(**validated_data)
        for amenity in amenities:
            hotel.amenities.add(amenity)
        print(hotel)
        return hotel

    def validate_amenities(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("Hotel must have atleast 2 amenities")
        return value


class HotelImagesSerializer(ModelSerializer):
    class Meta:
        model = HotelImages
        fields = "__all__"


class RoomSerializer(ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Room
        fields = ["id", "room_type", "price", "quantity", "image", "hotel"]


class RoomWithoutHotelSerializer(ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Room
        fields = ["id", "room_type", "price", "quantity", "image"]


class RoomTempSerializer(ModelSerializer):
    room_type = serializers.SerializerMethodField()

    class Meta:
        model = RoomTemp
        fields = "__all__"

    def get_room_type(self, obj):
        return obj.room.room_type


class BookTempCreateSerializer(ModelSerializer):
    rooms = RoomTempSerializer(many=True)

    class Meta:
        model = BookTemp
        fields = "__all__"

    def create(self, validated_data):
        rooms_data = validated_data.pop("rooms")
        book_temp = BookTemp.objects.create(**validated_data)
        for room_data in rooms_data:
            room = RoomTemp.objects.create(**room_data)
            book_temp.rooms.add(room)
        return book_temp


class RoomTempWithDetailSerializer(ModelSerializer):
    room = RoomSerializer()

    class Meta:
        model = RoomTemp
        fields = "__all__"


class BookTempWithDetailSerializer(ModelSerializer):
    rooms = RoomTempWithDetailSerializer(many=True)
    hotel_name = SerializerMethodField()

    class Meta:
        model = BookTemp
        fields = [
            "id",
            "check_in",
            "check_out",
            "rooms",
            "hotel_name",
        ]

    def get_hotel_name(self, obj):
        return obj.hotel.name


class FAQSerializer(ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["question", "answer"]


class HouseRulesSerializer(ModelSerializer):
    class Meta:
        model = HouseRules
        fields = ["smoking_allowed", "pets_allowed", "parties_allowed", "self_check_in"]


class AmenitySerializer(ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["name"]


class HotelCreateWithDetailsSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True)
    faqs = FAQSerializer(many=True)
    house_rules = HouseRulesSerializer(many=False)
    rooms = RoomWithoutHotelSerializer(many=True)
    hotel_image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Hotel
        fields = "__all__"

    def create(self, validated_data):
        print(validated_data["house_rules"])
        amenities_data = validated_data.pop("amenities")
        rooms_data = validated_data.pop("rooms")
        faqs = validated_data.pop("faqs")

        house_rules = validated_data.pop("house_rules")
        image = validated_data.pop("hotel_image")

        hotel = Hotel.objects.create(**validated_data)

        for amenity_data in amenities_data:
            amenity = Amenity.objects.get(name=amenity_data["name"])
            hotel.amenities.add(amenity)
        for room_data in rooms_data:
            Room.objects.create(hotel=hotel, **room_data)

        for faq_data in faqs:
            FAQ.objects.create(
                hotel=hotel, question=faq_data["question"], answer=faq_data["answer"]
            )

        for house_rule, value in house_rules.items():
            HouseRules.objects.create(hotel=hotel, **{house_rule: value})

        HotelImages.objects.create(hotel=hotel, image=image)

        return hotel


class BookCreateSerializer(ModelSerializer):
    rooms = RoomTempSerializer(many=True)

    class Meta:
        model = Booking
        fields = "__all__"

    def create(self, validated_data):
        rooms_data = validated_data.pop("rooms")
        bookings = Booking.objects.create(**validated_data)
        for room_data in rooms_data:
            room = RoomTemp.objects.create(**room_data)
            bookings.rooms.add(room)
        return bookings


class BookingSerializer(ModelSerializer):
    rooms = RoomTempSerializer(many=True)
    hotel_name = SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            "id",
            "check_in",
            "check_out",
            "rooms",
            "hotel_name",
            "email",
            "paymentIntentId",
        ]

    def get_hotel_name(self, obj):
        return obj.hotel.name
