from django.urls import path
from .views import HotelCreateApi, HotelDetailApi



urlpatterns = [
    path("hotels/<int:id>", HotelDetailApi.as_view(), name="hotels"),
    path("add-hotel/", HotelCreateApi.as_view(), name="hotels"),
  
]

