from rest_framework import generics
from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserCreateSerializer, MyTokenObtainPairSerializer
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail

class UserProfileCreateApi(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    
    def create(self, request, *args, **kwargs):       
        validated_data = request.data        
        serializer = self.get_serializer(data=validated_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print(serializer.data)
        
        send_mail(
        'Verify your email address',
        'Click the link to verify your email: http://localhost:8000/verify-email/' + "BLABLA",
        'ozonebhattarai@gmail.com',
        [serializer.data['email']],
        fail_silently=False,
        )
        # send_welcome_email(request.user)
        return Response({"success": "Created account Successfully"},status=status.HTTP_201_CREATED, headers=headers)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserLogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({"success": True})
        


def verify_email(request, token):
    pass
        