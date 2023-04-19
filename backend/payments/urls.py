from django.urls import path
from payments import views

urlpatterns = [path("test-payment/", views.create_payment)]
