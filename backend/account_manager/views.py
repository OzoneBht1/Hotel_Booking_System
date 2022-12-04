
from rest_framework import permissions
from rest_framework import generics
from .models import User
# from .serializers import UserProfileCreateSerializer, UserProfileSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.routers import Route, DynamicRoute, SimpleRouter
from rest_framework import viewsets
from .serializers import UserCreateSerializer


class UserProfileCreateApi(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer


# class UserProfileDetailApi(generics.RetrieveAPIView):
#     queryset = User.objects.filter(id=1)
#     serializer_class = UserProfileSerializer


# @api_view(['GET'])
# def getRoutes(request):
#     routes = ['token/', 'token/refresh']
#     return Response(routes)


# class TokenViewSet(viewsets.ViewSet):
#     def list(self, request):
#         routes = ['token/', 'token/refresh']
#         return Response(routes)
