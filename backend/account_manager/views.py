from rest_framework import generics
from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserCreateSerializer, MyTokenObtainPairSerializer


class UserProfileCreateApi(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
