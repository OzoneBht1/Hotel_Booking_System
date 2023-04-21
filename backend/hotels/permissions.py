from rest_framework import permissions


class IsPartnerPermission(permissions.DjangoModelPermissions):
    def has_permission(self, request, view):
        if (
            request.user.user_type == "Partner"
            or request.user.is_superuser
            or request.user.is_staff
        ):
            return True
        return False
