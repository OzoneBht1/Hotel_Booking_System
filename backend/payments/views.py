from rest_framework.decorators import api_view
from rest_framework.response import Response
import stripe
import os
from dotenv import load_dotenv

# Set your Stripe secret key
load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")


def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400


@api_view(["POST"])
def create_payment(request):
    # Create a PaymentIntent with the order amount and currency
    customer = stripe.Customer.create()
    try:
        data = request.data

        intent = stripe.PaymentIntent.create(
            customer=customer["id"],
            setup_future_usage="off_session",
            amount=calculate_order_amount(data["items"]),
            currency="usd",
            automatic_payment_methods={
                "enabled": True,
            },
        )
        return Response({"clientSecret": intent["client_secret"]}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=403)
