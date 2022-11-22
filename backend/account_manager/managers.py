from django.contrib.auth.models import BaseUserManager
from django.forms import ValidationError


class UserProfileManager(BaseUserManager):
    def create_user(self, email, name, password=None, is_hotel_staff=False, country=None):
        if not email:
            raise ValidationError('User must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name,
                          is_hotel_staff=is_hotel_staff, country=country)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, is_hotel_staff=False, country=None):
        user = self.create_user(email, name, password, is_hotel_staff, country)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
