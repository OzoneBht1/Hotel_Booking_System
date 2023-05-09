from rest_framework.decorators import api_view
from rest_framework.response import Response
import stripe
import os
from dotenv import load_dotenv
import functools


# Set your Stripe secret key
load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")


def calculate_order_amount(items):
    print(items)
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client

    total_quantity = functools.reduce(
        lambda acc, item: acc + item["quantity"] * item["price"], items["rooms"], 0
    )

    return total_quantity


@api_view(["POST"])
def create_payment(request):
    # Create a PaymentIntent with the order amount and currency
    try:
        data = request.data

        print(data)

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
    customer = stripe.Customer.create(
        email=email,
    )
    extra_msg = ""
    customer_data = stripe.Customer.list(email=email.data)
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
        confirm=True,
    )

    return Response({"success": True, "extra_msg": extra_msg}, status=200)
