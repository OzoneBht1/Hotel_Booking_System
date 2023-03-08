from django.contrib import admin
from .models import Hotel, Amenity, Room, HotelImages, Booking

# Register your models here.

admin.site.register(Hotel)
admin.site.register(Amenity)
admin.site.register(Room)
admin.site.register(HotelImages)
admin.site.register(Booking)