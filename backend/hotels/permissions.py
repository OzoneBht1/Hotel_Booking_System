from rest_framework import permissions


class IsPartnerPermission(permissions.DjangoModelPermissions):
    def has_permission(self, request, view, _):
        if (
            request.user.user_type == "Partner"
            or request.user.is_superuser
            or request.user.is_staff
        ):
            return True
        return False


class IsCurrentUserPermission(permissions.DjangoModelPermissions):
    def has_permission(self, request, views, obj):
        return (
            obj.user.id == request.user.id
            or request.user.is_superuser
            or request.user.is_staff
        )


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
