from django.contrib import admin
from django.urls import path

from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from .views import TokenViewSet

# user_list = TokenViewSet.as_view({'get': 'list'})


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
