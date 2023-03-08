from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import HotelSerializer, BookingSerializer
from django.db.models import Value, CharField
from .models import Hotel
from .permissions import IsPartnerPermission
from .pagination import CustomHotelSearchPagination
# Create your views here.


class HotelDetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    lookup_field = 'id'
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    

class HotelCreateApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser, IsPartnerPermission]    

    def post(self, request, *args, **kwargs):
        
        return self.create(request, *args, **kwargs)
    
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    
class HotelListApi(generics.ListAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = CustomHotelSearchPagination
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class HotelSearchApi(generics.ListAPIView):
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = []
    pagination_class = CustomHotelSearchPagination
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def get_queryset(self):
        queryset = Hotel.objects.all()
        name = self.request.query_params.get('q', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset    


    
    
class BookingCreateApi(generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    
class HotelsByLocationApi(generics.ListAPIView):
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = []
    # pagination_class = CustomHotelSearchPagination
    pagination_class = None
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def get_queryset(self):
        countries = ['France', 'United Kingdom', 'Netherlands', 'Austria']
        hotels = []
        
        for country in countries:
            country_hotels = Hotel.objects.filter(address__icontains=country)[:12].annotate(country = Value(country, CharField()))
            hotels.extend(country_hotels)
        

        return hotels

