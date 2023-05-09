from django.urls import path
from payments import views

urlpatterns = [
    path("test-payment/", views.create_payment),
    path("create-payment/", views.save_stripe_info),
]
