from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .managers import UserProfileManager
from django.templatetags.static import static
from PIL import Image
import uuid

# Create your models here.
GENDER_CHOICES = (
    ("Male", "Male"),
    ("Female", "Female"),
    ("Others", "Others"),
)

USER_CHOICES = (
    ("Normal", "Normal"),
    ("Partner", "Partner"),
    ("Admin", "Admin")
)


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=10)
    objects = UserProfileManager()
    country = models.CharField(max_length=150)
    image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    default_pic_mapping = {'Male': 'def_male.jpg', 'Female': 'def_female.jpg', 'Others': 'def_other.jpg'}
    user_type = models.CharField(max_length=50, choices=USER_CHOICES, default="Normal")


    
    REQUIRED_FIELDS = ['first_name', 'last_name', 'country', 'gender']
    USERNAME_FIELD = 'email'

    def __str__(self) -> str:
        return f"{str(self.id)}, {self.first_name},{self.email}, {self.user_type}"    

           
    
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)        
        if not self.image: 
            default_image_path= "profile_images/"+self.default_pic_mapping[self.gender]
            self.image = default_image_path               
        image = Image.open(self.image.path)
        if image.height >=300 or image.width >= 300:
            output_size = (300, 300)
            image.thumbnail(output_size)
            image.save(self.image.path)
        
    
class EmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=4, null=True, blank=True)
    
    
    
    
        
            
        


# class Owner(models.Model):
