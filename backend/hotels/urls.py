from django.urls import path
from .views import (
    HotelCreateApi,
    HotelDetailApi,
    HotelListApi,
    HotelSearchApi,
    HotelsByLocationApi,
    HotelByLocationAndNameApi,
    ReviewByHotelApi,
    recommend_hotels,
    RoomByHotelApi,
)


urlpatterns = [
    path("hotels/", HotelListApi.as_view(), name="hotels"),
    path("hotels/<int:id>", HotelDetailApi.as_view(), name="hotels"),
    path(
        "hotels/<int:id>/reviews",
        ReviewByHotelApi.as_view(),
        name="hotel_review",
    ),
    path(
        "hotels/<int:id>/rooms",
        RoomByHotelApi.as_view(),
        name="hotel_rooms",
    ),
    path("hotels/search/", HotelSearchApi.as_view(), name="hotel_search"),
    path("add-hotel/", HotelCreateApi.as_view(), name="hotels"),
    # path('create-booking/', BookingCreateApi.as_view(), name='booking'),
    path(
        "hotels-by-location/", HotelsByLocationApi.as_view(), name="hotel_by_location"
    ),
    path(
        "hotels/hotels-by-name-location/",
        HotelByLocationAndNameApi.as_view(),
        name="hotel_by_location",
    ),
    path("hotels/recommend-hotels/", recommend_hotels, name="recommend"),
]
