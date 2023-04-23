from django.urls import path
from .views import (
    CreateBookingTempApi,
    GetBookingTempApi,
    HotelCreateApi,
    HotelDetailApi,
    HotelListApi,
    HotelSearchApi,
    HotelsByLocationApi,
    HotelByLocationAndNameApi,
    ReviewByHotelApi,
    recommend_hotels,
    RoomByHotelApi,
    SingleRoomByHotelApi,
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
    path(
        "hotels/<int:hotel_id>/rooms/<int:id>",
        SingleRoomByHotelApi.as_view(),
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
    path(
        "hotels/<int:hotel_id>/get-temp-booking/<int:user_id>/",
        GetBookingTempApi.as_view(),
        name="create-booking",
    ),
    path(
        "hotels/<int:hotel_id>/create-temp-booking/<int:user_id>/",
        CreateBookingTempApi.as_view(),
        name="create-booking",
    ),
    path("hotels/recommend-hotels/", recommend_hotels, name="recommend"),
]
