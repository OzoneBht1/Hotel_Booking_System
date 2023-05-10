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


class IsCurrentUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if (
            request.user.id == view.kwargs["user_id"]
            or request.user.is_superuser
            or request.user.is_staff
        ):
            return True
        return False


#
# def has_permission(self, request, view):
#        if isinstance(request.user, User):
#            if (
#                request.user.is_authenticated
#                and request.user.id == view.kwargs["id"]
#                or request.user.is_superuser
#                or request.user.is_staff
#            ):
#                return True
#        return False
