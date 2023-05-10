from rest_framework import permissions


class UserDetailPermission(permissions.DjangoModelPermissions):
    def has_permission(self, request, view):
        if (
            request.user.id == view.kwargs["id"]
            or request.user.is_superuser
            or request.user.is_staff
        ):
            return True
        return False
