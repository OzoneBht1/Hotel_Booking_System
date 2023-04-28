from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import User
from .serializers import UserCreateSerializer
from django.core.files import File
from django.conf import settings
import os


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

#
# class UserCreateSerializerTest(TestCase):
#     def setUp(self):
#         self.data = {
#             "first_name": "test",
#             "last_name": "test",
#             "email": "test@testin.com",
#             "gender": "Male",
#             "country": "China",
#             "password": "test",
#         }
#         user = User.objects.create_user(self.data, password=self.data["password"])
#         user.save()


class TestSetUp(APITestCase):
    def setUp(self) -> None:
        self.register_url = reverse("register")
        self.login_url = reverse("token_obtain_pair")

        self.data = {
            "first_name": "test",
            "last_name": "test",
            "email": "test@testin.com",
            "gender": "Male",
            "country": "China",
            "password": "test123",
            "password2": "test123",
            "is_active": True,
            # "code": 1234,
            "image": "",
        }

        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()


class TestRegistration(TestSetUp):
    def test_user_can_register(self):
        response = self.client.post(self.register_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_cannot_register_with_no_data(self):
        response = self.client.post(self.register_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_model_save_method_with_image(self):
        user_data_copy = self.data.copy()
        user_data_copy.pop("password2")
        user_data_copy.pop("image")

        self.user = User.objects.create_user(
            email=user_data_copy["email"],
            first_name=user_data_copy["first_name"],
            last_name=user_data_copy["last_name"],
            password=self.data["password"],
            gender=self.data["gender"],
            country=self.data["country"],
            is_active=True,
        )

        image_path = (
            f"{settings.MEDIA_ROOT}profile_images/wallpaperflare.com_wallpaper.jpg"
        )
        with open(image_path, "rb") as f:
            image_file = File(f)
            self.user.image.save("image.jpg", image_file, save=False)
        self.user.save()

        self.user.refresh_from_db()

        # The images are saved as thumbnails in database, and get appended random generated string when saving
        regex_pattern = r"^image_[a-zA-Z0-9]+\.\w+$"
        self.assertRegex(os.path.basename(self.user.image.path), regex_pattern)
        self.assertTrue(os.path.isfile(self.user.image.path))

    #
    def test_user_model_save_method_without_image(self):
        user_data_copy = self.data.copy()
        user_data_copy.pop("password2")
        user_data_copy.pop("image")
        user = User.objects.create(
            email=user_data_copy["email"],
            first_name=user_data_copy["first_name"],
            last_name=user_data_copy["last_name"],
            password=self.data["password"],
            gender="Male",
            country=self.data["country"],
            is_active=True,
        )

        user.save()
        print(user)

        user.refresh_from_db(using="default")

        self.assertEqual(
            user.image.path, f"{settings.MEDIA_ROOT}profile_images/def_male.jpg"
        )
        self.assertTrue(os.path.isfile(user.image.path))
