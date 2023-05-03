from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
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
    user = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = "__all__"

    def get_user(self, obj):
        user = obj.user
        return UserDetailForReviewSerializer(user).data


class HotelSerializer(ModelSerializer):
    hotel_images = serializers.SerializerMethodField()
    amenities = serializers.StringRelatedField(many=True, read_only=True)
    manager = serializers.StringRelatedField(read_only=True)
    review_count = serializers.SerializerMethodField()
    cheapest_price = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "address",
            "amenities",
            "room_count",
            "manager",
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
        room = Room.objects.filter(hotel=obj).order_by("?").first()
        if room:
            return room.price
        else:
            return "N/A"

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


class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "id",
            "user",
            "hotel",
            "room",
            "check_in",
            "check_out",
            "booking_date",
            "booking_amount",
        ]


class RoomSerializer(ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Room
        fields = ["id", "room_type", "price", "quantity", "image", "hotel"]


class RoomTempSerializer(ModelSerializer):
    class Meta:
        model = RoomTemp
        fields = "__all__"


class RoomTempWithDetailSerializer(ModelSerializer):
    room = RoomSerializer()

    class Meta:
        model = RoomTemp
        fields = "__all__"


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


class BookTempWithDetailSerializer(ModelSerializer):
    rooms = RoomTempWithDetailSerializer(many=True)
    hotel_name = SerializerMethodField()

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
        fields = "__all__"


class HotelCreateWithDetailsSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True)
    faqs = FAQSerializer(many=True)
    house_rules = HouseRulesSerializer(many=False)
    rooms = RoomSerializer(many=True)
    hotel_image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Hotel
        fields = "__all__"

    def create(self, validated_data):
        # Separate the related objects from the hotel data
        amenities_data = validated_data.pop("amenities")
        faqs_data = validated_data.pop("faqs")
        house_rules_data = validated_data.pop("house_rules")
        rooms_data = validated_data.pop("rooms")
        hotel_image_data = validated_data.pop("hotel_image", None)

        # Create the hotel instance
        hotel = Hotel.objects.create(**validated_data)

        # Create the related objects
        amenities = []
        for amenity_data in amenities_data:
            amenity = Amenity.objects.create(**amenity_data)
            amenities.append(amenity)
        hotel.amenities.set(amenities)

        faqs = []
        for faq_data in faqs_data:
            faq = FAQ.objects.create(**faq_data)
            faqs.append(faq)
        hotel.faqs.set(faqs)

        house_rules = HouseRules.objects.create(**house_rules_data)
        hotel.house_rules = house_rules

        rooms = []
        for room_data in rooms_data:
            room = Room.objects.create(hotel=hotel, **room_data)
            rooms.append(room)

        if hotel_image_data:
            hotel_image = HotelImages.objects.create(
                hotel=hotel, image=hotel_image_data
            )
            hotel.hotel_images.add(hotel_image)

        return hotel


#
# class HotelCreateWithDetailsSerializer(serializers.ModelSerializer):
#     amenities = AmenitySerializer(many=True)
#     faqs = FAQSerializer(many=True)
#     house_rules = HouseRulesSerializer(many=False)
#     rooms = RoomSerializer(many=True)
#     hotel_image = Base64ImageField(required=False, allow_null=True)
#
#     class Meta:
#         model = Hotel
#         fields = "__all__"
#
#     def create(self, validated_data):
#         amenities_data = validated_data.pop("amenities")
#         rooms_data = validated_data.pop("rooms")
#         faqs = validated_data.pop("faqs")
#         house_rules = validated_data.pop("house_rules")
#         image = validated_data.pop("hotel_image")
#
#         house_rules.remove("hotel")
#         hotel = Hotel.objects.create(**validated_data)
#
#         for amenity_data in amenities_data:
#             amenity = Amenity.objects.get(name=amenity_data["name"]).name
#             hotel.amenities.add(amenity)
#
#         for room_data in rooms_data:
#             Room.objects.create(hotel=hotel, **room_data)
#
#         for faq in faqs:
#             FAQ.objects.create(hotel=hotel, **faq)
#
#         for house_rule in house_rules:
#             HouseRules.objects.create(hotel=hotel, **house_rule)
#
#         HotelImages.objects.create(hotel=hotel, image=image)
#
#         return hotel
