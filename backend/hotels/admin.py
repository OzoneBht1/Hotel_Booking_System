from django.contrib import admin
from .models import (
    Hotel,
    Amenity,
    Room,
    HotelImages,
    Booking,
    Review,
    BookTemp,
    RoomTemp,
    FAQ,
    HouseRules,
    History,
)

# Register your models here.

admin.site.register(Hotel)
admin.site.register(Amenity)
admin.site.register(Room)
admin.site.register(HotelImages)
admin.site.register(Booking)
admin.site.register(Review)
admin.site.register(BookTemp)
admin.site.register(RoomTemp)
admin.site.register(FAQ)
admin.site.register(HouseRules)
admin.site.register(History)
