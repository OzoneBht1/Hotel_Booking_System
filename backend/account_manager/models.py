from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .managers import UserProfileManager


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    gender = models.CharField(max_length=50)
    objects = UserProfileManager()
    country = models.CharField(max_length=150)

    REQUIRED_FIELDS = ['name', 'country', 'gender']
    USERNAME_FIELD = 'email'

    def str(self) -> str:
        return f"{self.name},{self.email} :hotel staff ? {self.is_hotel_staff} "


# class Owner(models.Model):
