from datetime import datetime
from rest_framework import permissions

#
# class IsPartnerPermission(permissions.DjangoModelPermissions):
#     def has_permission(self, request, view, obj):
#         if (
#             request.user.user_type == "Partner"
#             or request.user.is_superuser
#             or request.user.is_staff
#         ):
#             return True
#         return False
#


from rest_framework import permissions

from hotels.serializers import Booking, Review


class IsCurrentUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if (
            request.user.id == view.kwargs["user_id"]
            or request.user.is_superuser
            or request.user.is_staff
        ):
            return True
        return False


class CanLeaveReview(permissions.BasePermission):
    message = "You can only leave a review if you have booked the hotel and the checkout date has passed."

    def has_permission(self, request, view):
        user = view.kwargs.get("user_id")
        hotel_id = view.kwargs.get("hotel_id")

        bookings_count = Booking.objects.filter(
            user=user, hotel=hotel_id, check_out__lt=datetime.now().date()
        ).count()
        reviews_count = Review.objects.filter(user=user, hotel=hotel_id).count()

        return bookings_count > reviews_count
