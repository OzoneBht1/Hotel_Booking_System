from django.urls import path
from .views import (
    BookingCreateApi,
    BookingDetailsByUserApi,
    CheckPermissionAPIView,
    CreateBookingTempApi,
    DeleteTempBookingApi,
    FAQByHotelApi,
    GetBookingApi,
    GetBookingTempApi,
    HotelCreateApi,
    HotelCreateWithDetailApi,
    HotelDetailApi,
    HotelListApi,
    HotelSearchApi,
    HotelsByLocationApi,
    HotelByLocationAndNameApi,
    HouseRulesByHotelApi,
    ModifyReviewApi,
    ReviewByHotelApi,
    ReviewCreateApi,
    ReviewsNotByUser,
    ReviewsOfAUserApi,
    recommend_hotels,
    get_next_available_date,
    RoomByHotelApi,
    SingleRoomByHotelApi,
)

# type: ignore
urlpatterns = [
    path("hotels/", HotelListApi.as_view(), name="hotels"),  # type: ignore
    path("hotels/<int:id>", HotelDetailApi.as_view(), name="hotels"),
    path(
        "hotels/<int:id>/reviews",
        ReviewByHotelApi.as_view(),
        name="hotel_review",
    ),
    path(
        "hotels/<int:id>/faqs",
        FAQByHotelApi.as_view(),
        name="hotel_faq",
    ),
    path(
        "hotels/<int:id>/house-rules",
        HouseRulesByHotelApi.as_view(),
        name="hotel_faq",
    ),
    path(
        "hotels/<int:id>/rooms",
        RoomByHotelApi.as_view(),
        name="hotel_rooms",
    ),
    path(
        "rooms/<int:room_id>/availability",
        get_next_available_date,
        name="room_availability",
    ),
    path(
        "hotels/<int:hotel_id>/rooms/<int:id>",
        SingleRoomByHotelApi.as_view(),
    ),
    path("hotels/search/", HotelSearchApi.as_view(), name="hotel_search"),
    path("add-hotel/", HotelCreateApi.as_view(), name="hotels"),
    path(
        "hotels/create-hotel-with-detail/",
        HotelCreateWithDetailApi.as_view(),
        name="create-hotel-with-detail",
    ),
    # path('create-booking/', BookingCreateApi.as_view(), name='booking'),
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
        name="get-booking",
    ),
    path(
        "hotels/<int:hotel_id>/create-temp-booking/<int:user_id>/",
        CreateBookingTempApi.as_view(),
        name="create-temp-booking",
    ),
    path(
        "hotels/<int:hotel_id>/delete-temp-booking/<int:user_id>/",
        DeleteTempBookingApi.as_view(),
        name="delete-temp-booking",
    ),
    path(
        "hotels/<int:hotel_id>/create-booking/<int:user_id>/",
        BookingCreateApi.as_view(),
        name="create-booking",
    ),
    path(
        "booking/<int:user_id>",
        BookingDetailsByUserApi.as_view(),
        name="booking",
    ),
    path(
        "<int:hotel_id>/reviews/user/<int:user_id>",
        ReviewsOfAUserApi.as_view(),
        name="reviews-of-user",
    ),
    path(
        "<int:hotel_id>/reviews/not-by-user/<int:user_id>",
        ReviewsNotByUser.as_view(),
        name="reviews-not-by-user",
    ),
    path(
        "<int:hotel_id>/reviews/<int:user_id>/create-review",
        ReviewCreateApi.as_view(),
        name="review-create",
    ),
    path(
        "<int:hotel_id>/reviews/<int:user_id>/has-perm",
        CheckPermissionAPIView.as_view(),
        name="check-perm",
    ),
    path(
        "reviews/<int:review_id>",
        ModifyReviewApi.as_view(),
        name="modify-reviews",
    ),
    path("hotels/recommend-hotels/", recommend_hotels, name="recommend"),
    path(
        "booking/<int:hotel_id>/<int:user_id>",
        GetBookingApi.as_view(),
        name="get-single-booking",
    ),
]
