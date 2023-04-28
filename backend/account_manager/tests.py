from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import User
from .serializers import UserCreateSerializer

# first_name = models.CharField(max_length=200)
#     last_name = models.CharField(max_length=200)
#     email = models.EmailField(unique=True)
#     is_active = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)
#     gender = models.CharField(choices=GENDER_CHOICES, max_length=10)
#     objects = UserProfileManager()
#     country = models.CharField(max_length=150)
#     image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
#     default_pic_mapping = {'Male': 'def_male.jpg', 'Female': 'def_female.jpg', 'Others': 'def_other.jpg'}
#     user_type = models.CharField(max_length=50, choices=USER_CHOICES, default="Normal")
#


class UserCreateSerializerTest(TestCase):
    def setUp(self):
        self.data = {
            "first_name": "test",
            "last_name": "test",
            "email": "test@testin.com",
            "gender": "Male",
            "country": "China",
            "password": "test",
        }
        user = User.objects.create_user(self.data, password=self.data["password"])
        user.save()
