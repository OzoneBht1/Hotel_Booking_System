from rest_framework import permissions
from account_manager.models import User


class UserDetailPermission(permissions.DjangoModelPermissions):
    def has_permission(self, request, view):
        if isinstance(request.user, User):
            if (
                request.user.is_authenticated
                and request.user.id == view.kwargs["id"]
                or request.user.is_superuser
                or request.user.is_staff
            ):
                return True
        return False
