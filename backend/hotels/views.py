from django.shortcuts import render
import random
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import HotelSerializer, BookingSerializer

from .models import Hotel, Amenity, User
from .permissions import IsPartnerPermission
# Create your views here.


class HotelDetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    lookup_field = 'id'
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    

class HotelCreateApi(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser, IsPartnerPermission]    

    def post(self, request, *args, **kwargs):
        
        return self.create(request, *args, **kwargs)
    
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    
    
    
    
class BookingCreateApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    
    
    
    
    
        