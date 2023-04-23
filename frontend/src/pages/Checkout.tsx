import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import CheckoutForm from "../components/Checkout/Checkout";
import { BASEURL } from "../store/api/apiSlice";

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_URL);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState<any>();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${BASEURL}/payment/test-payment/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  type Theme = "stripe" | "night" | "flat" | "none" | undefined;

  const appearance: { theme: Theme } = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm data={{ payment_intent_client_secret: clientSecret }} />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
