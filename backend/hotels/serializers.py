from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from .models import (
    FAQ,
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
from account_manager.serializers import UserDetailForReviewSerializer


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
    class Meta:
        model = Room
        fields = "__all__"


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
        fields = "__all__"


class HouseRulesSerializer(ModelSerializer):
    class Meta:
        model = HouseRules
        fields = "__all__"
