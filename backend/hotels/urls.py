from django.urls import path
from .views import HotelCreateApi, HotelDetailApi, BookingCreateApi, HotelSearchApi



urlpatterns = [
    path("hotels/<int:id>", HotelDetailApi.as_view(), name="hotels"),
    path("hotels/search/", HotelSearchApi.as_view(), name="hotel_search"),
    path("add-hotel/", HotelCreateApi.as_view(), name="hotels"),
    path('create-booking/', BookingCreateApi.as_view(), name='booking')
  
]

