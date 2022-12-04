from rest_framework.serializers import ModelSerializer
from .models import User
from rest_framework import serializers
from rest_framework.serializers import ValidationError

# from rest_framework.validators import ValidationError
from django.contrib.auth.hashers import make_password

GENDER_CHOICES = (
    ("Male", "Male"),
    ("Female", "Female"),
    ("Others", "Others"),
)


class UserCreateSerializer(ModelSerializer):
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    password = serializers.CharField(write_only=True, required=True, style={
                                     'input_type': 'password', })
    password2 = serializers.CharField(write_only=True, required=True, style={
        'input_type': 'password', })

    class Meta:
        model = User
        fields = ['name', 'email', 'gender',
                  'country', 'password', 'password2']

    def create(self, validated_data):
        print("AOBUT TO RETURN USER")
        validated_data['password'] = make_password(
            validated_data.get('password'))
        # validated_data['password2'] = make_password(
        #     validated_data.get('password2'))

        validated_data.pop('password2')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        return user

    def validate(self, data):
        print(data)
        if data['password'] != data['password2']:

            raise ValidationError({"password2": "Passwords must match"})

        return data

    def validate_password(self, value):
        print("RUNNING VALIDATE PASSWORD")
        if len(value) < 7:
            raise ValidationError(
                {"password": "Password must be at least 7 characters long"})

            # "The length of password must be greater than 7")
        return value
