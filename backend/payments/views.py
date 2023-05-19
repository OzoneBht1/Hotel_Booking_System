from rest_framework.decorators import api_view
from rest_framework.response import Response
import stripe
import os
from dotenv import load_dotenv
import functools
import datetime

from account_manager.views import send_mail
from hotels.serializers import Booking


# Set your Stripe secret key
load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")


import datetime
import functools


def calculate_order_amount(items):
    check_in_date = datetime.datetime.strptime(items["check_in"], "%Y-%m-%d")
    check_out_date = datetime.datetime.strptime(items["check_out"], "%Y-%m-%d")

    stay_duration = (check_out_date - check_in_date).days

    total_quantity = functools.reduce(
        lambda acc, item: acc + (item["quantity"] * item["price"] * stay_duration),
        items["rooms"],
        0,
    )
    # converting to dollars
    return total_quantity * 100


@api_view(["POST"])
def create_payment(request):
    # Create a PaymentIntent with the order amount and currency
    try:
        data = request.data

        intent = stripe.PaymentIntent.create(
            setup_future_usage="off_session",
            amount=calculate_order_amount(data),
            currency="usd",
            automatic_payment_methods={
                "enabled": True,
            },
        )
        return Response({"clientSecret": intent["client_secret"]}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=403)


@api_view(["POST"])
def save_stripe_info(request):
    data = request.data
    email = data["email"]
    payment_method = data["paymentMethodId"]
    customer = stripe.Customer.create(
        email=email,
        payment_method=payment_method,
    )
    extra_msg = ""
    customer_data = stripe.Customer.list(email=email).data
    if len(customer_data) == 0:
        customer = stripe.Customer.create(
            email=email,
        )
    else:
        customer = customer_data[0]
        extra_msg = "Customer already exists."

    stripe.PaymentIntent.create(
        customer=customer,
        currency="usd",
        amount=calculate_order_amount(data["bookDetail"]),
        payment_method=payment_method,
        confirm=True,
    )

    return Response({"success": True, "extra_msg": extra_msg}, status=200)


@api_view(["POST"])
def send_bill(request):
    booking_data = request.data
    payment_intent = request.query_params.get("secret", None)

    bookingDetail = Booking.objects.get(paymentIntentId=payment_intent)
    # create booking
    # fetch the booking
    # products =

    data = stripe.PaymentIntent.retrieve(
        payment_intent,
    )
    # stripe.Invoice.create(
    #     customer=data["customer"],
    # )
    #
    # stripe.Invoice.send_invoice(
    #     data["invoice"],
    #
    # )
    #

    message = (
        f"Dear {bookingDetail.user.first_name} {bookingDetail.user.last_name},\n\n"
        f"Thank you for your booking.\n"
        f"Here are the details of your booking:\n\n"
        f"Booking ID: {bookingDetail.pk}\n"
        f"Check-in Date: {str(bookingDetail.check_in)}\n"
        f"Check-out Date: {str(bookingDetail.check_out)}\n"
        f"Hotel: {booking_data['hotel_name']}\n\n"
        f"Rooms:\n"
    )

    for room in booking_data["rooms"]:
        message += f"Room: {room['room_type']}, Quantity: {room['quantity']}\n"

    message += (
        f"\nPlease keep this information for your reference.\n"
        f"Thank you for choosing our service!\n\n"
        f"Best regards,\n"
        f"Your Booking Team"
    )
    send_mail(
        f"Hi",
        message,
        "ozonebhattarai@gmail.com",
        [data["receipt_email"]],
        fail_silently=False,
    )

    return Response(
        {"success": True, "data": data},
        status=200,
    )
