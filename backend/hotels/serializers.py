from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Hotel, Amenity, Booking, HotelImages


class HotelSerializer(ModelSerializer):
    amenities = serializers.StringRelatedField(many=True,read_only=True)   
    manager = serializers.StringRelatedField(read_only=True)
  
    
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address','amenities', 'room_count', 'manager']     
        
        
    def create(self, validated_data):
        # print(validated_data["manager"])
        
        amenities = validated_data.pop('amenities',[])
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



class HotelImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelImages
        fields = '__all__'

class HomepageHotelSerializer(serializers.ModelSerializer):
    country = serializers.CharField()
    hotel_images = HotelImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address', 'amenities', 'room_count', 'manager', 'country', 'hotel_images']

class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'hotel', 'room', 'check_in', 'check_out', 'booking_date', 'booking_amount']
            
