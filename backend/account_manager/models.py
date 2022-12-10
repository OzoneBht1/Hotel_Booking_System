from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .managers import UserProfileManager

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    gender = models.CharField(max_length=50)
    objects = UserProfileManager()
    country = models.CharField(max_length=150)

    REQUIRED_FIELDS = ['first_name', 'last_name', 'country', 'gender']
    USERNAME_FIELD = 'email'

    def str(self) -> str:
        return f"{self.first_name},{self.email}"


# class Owner(models.Model):
