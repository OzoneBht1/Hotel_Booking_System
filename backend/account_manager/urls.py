from django.urls import path
from rest_framework_simplejwt.views import (

    TokenRefreshView,
)
from .views import UserProfileCreateApi, MyTokenObtainPairView, UserLogoutView, verify_email
# from .views import TokenViewSet

# user_list = TokenViewSet.as_view({'get': 'list'})


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserProfileCreateApi.as_view(), name='register'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('verify/', verify_email, name='verify_email')

]
