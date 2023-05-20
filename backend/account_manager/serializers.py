from .models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework.serializers import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from .base64encoder import Base64ImageField


GENDER_CHOICES = (
    ("Male", "Male"),
    ("Female", "Female"),
    ("Others", "Others"),
)


class UserCreateSerializer(ModelSerializer):
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={
            "input_type": "password",
        },
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={
            "input_type": "password",
        },
    )
    # image = Base64ImageField(max_length=None, use_url=True, required=False)
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "gender",
            "country",
            "password",
            "password2",
            "image",
        ]

    def create(self, validated_data):
        # Get the password from the validated data
        password = validated_data.get("password")

        # Hash the password
        hashed_password = make_password(password)

        # Create the user object
        user = User.objects.create(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            gender=validated_data["gender"],
            country=validated_data["country"],
            password=hashed_password,
            image=validated_data["image"],
        )
        # Save the user object
        user.save()
        print(user)
        return user

    def validate(self, data):
        print(data)
        if data["password"] != data["password2"]:
            raise ValidationError({"password2": "The two passwords do not match"})

        return data

    def validate_password(self, value):
        print("RUNNING VALIDATE PASSWORD")
        if len(value) < 7:
            raise ValidationError(
                {"password": "Password must be at least 7 characters long"}
            )

        return value


class UserDetailSerializer(ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "gender",
            "country",
            "image",
            "id",
            "user_type",
            "is_active",
            "is_superuser",
        ]
        read_only_fields = ["email"]


from django.contrib.auth.hashers import check_password


class PasswordUpdateSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(
        write_only=True,
        required=True,
        style={
            "input_type": "password",
        },
    )
    new_password = serializers.CharField(
        write_only=True,
        required=True,
        style={
            "input_type": "password",
        },
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={
            "input_type": "password",
        },
    )

    class Meta:
        model = User
        fields = [
            "old_password",
            "new_password",
            "password2",
        ]

    def validate(self, data):
        user = self.context["request"].user

        # Check if the old password matches
        print(user)
        if not check_password(data["old_password"], user.password):
            raise serializers.ValidationError("Invalid old password.")

        # Check if the new passwords match
        if data["new_password"] != data["password2"]:
            raise serializers.ValidationError("New passwords do not match.")

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data["new_password"])
        instance.save()
        return instance


class ProfileUpdateSerializer(ModelSerializer):
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "gender",
            "country",
            "image",
        ]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print(user)

        token = super().get_token(user)
        # print(token)

        # Add custom claims
        # token["name"] = user.name
        token["user_type"] = user.user_type
        # ...

        return token

    def validate(self, attrs):
        try:
            # Get the user object using the email address
            user = User.objects.get(email=attrs["email"])
            result = check_password(attrs["password"], user.password)
            # check_password method is how authenticate method validates under the hood

            if result:
                if user.is_active:
                    print("AUTHENTICATING")
                    user = authenticate(
                        username_field="email",
                        username=attrs["email"],
                        password=attrs["password"],
                    )
                    return super().validate(attrs)
                else:
                    print("RAISING")
                    raise serializers.ValidationError({"email": "Email Not verified"})
            else:
                raise serializers.ValidationError({"email": "Invalid credentials"})
        except User.DoesNotExist:
            print("IM HERE AS WELL")
            raise serializers.ValidationError({"email": "Invalid creden"})


class UserDetailForReviewSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "country", "image"]


class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=10)
