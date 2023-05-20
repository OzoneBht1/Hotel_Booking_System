from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

from hotels.pagination import CustomPagination
from hotels.views import IsAdminUser, IsAuthenticated
from .models import User, EmailVerification
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    PasswordUpdateSerializer,
    ProfileUpdateSerializer,
    UserCreateSerializer,
    MyTokenObtainPairSerializer,
    EmailVerificationSerializer,
    UserDetailSerializer,
)
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
import string
import random
from rest_framework.decorators import api_view
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import UserDetailPermission
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.crypto import get_random_string


class UserListSerializer(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    pagination_class = CustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]

    filterset_fields = [
        "email",
        "is_active",
        "is_staff",
        "is_superuser",
        "user_type",
        "country",
    ]
    search_fields = ["^email", "$first_name", "$last_name", "id"]
    ordering_fields = ["id", "last_name", "country"]
    ordering = ["last_name"]


class UserProfileCreateApi(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)

        validated_data = request.data
        serializer = self.get_serializer(data=validated_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print(serializer.data)
        code = "".join(random.choices(string.digits, k=4))
        user = User.objects.get(email=serializer.data["email"])

        verification = EmailVerification(user=user, code=code)
        verification.save()

        send_mail(
            "Verify your email address",
            f"Your verification code is: {code}",
            "ozonebhattarai@gmail.com",
            [serializer.data["email"]],
            fail_silently=False,
        )

        # send_welcome_email(request.user)
        return Response(
            {"success": "Created account Successfully"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class UserProfileUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileUpdateSerializer
    lookup_field = "id"
    permission_classes = [IsAuthenticated, UserDetailPermission, IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(
            {"message": "Updated Account Successfully"},
            status=status.HTTP_200_OK,
        )

    def perform_update(self, serializer):
        serializer.save()


class PasswordUpdateView(generics.UpdateAPIView):
    serializer_class = PasswordUpdateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def get_object(self):
        user = User.objects.get(id=self.kwargs["id"])
        return user


class UserDetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = "id"
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserDetailPermission]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserLogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({"success": True})


@api_view(["POST"])
@csrf_exempt
def reset_password(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)

    # Generate a random password
    new_password = get_random_string(length=10)

    # Set the user's password
    user.set_password(new_password)
    user.save()

    # Send the new password to the user's email
    send_mail(
        "Password Reset",
        f"Your new password: {new_password}. Please reset the password as soon as you log in from the profile page.",
        "noreply@example.com",
        [user.email],
        fail_silently=False,
    )

    return Response({"message": "Password reset successful"}, status=200)


@api_view(["POST"])
def verify_email(request):
    serializer = EmailVerificationSerializer(data=request.data)
    print(serializer)

    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data["email"]
    code = serializer.validated_data["code"]

    # Get the EmailVerification object with the matching code and user
    try:
        verification = EmailVerification.objects.get(user__email=email, code=code)
    except:
        return Response({"message": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)

    # Mark the user's email as verified
    user = verification.user
    user.is_active = True
    user.save()

    # Delete the EmailVerification object
    verification.delete()

    return Response({"message": "Email verified"}, status=status.HTTP_200_OK)
