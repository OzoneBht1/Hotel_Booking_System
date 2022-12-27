from django.contrib.auth.models import BaseUserManager
from django.forms import ValidationError


class UserProfileManager(BaseUserManager):
    def create_user(self, email, password, is_active=True, **extra_fields):
        if not email:
            raise ValidationError('User must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, is_active=is_active, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, is_active=True, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('user_type', "Admin")
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('user_type')!= "Admin":
            raise ValueError('Superuser must have user_type=True.')
            
        user = self.create_user(email, password, is_active, **extra_fields)
        user.save(using=self._db)
        return user
