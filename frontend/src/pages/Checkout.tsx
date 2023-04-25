import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Checkout/Checkout";
import Loading from "../components/Loading";
import { useCreatePaymentQuery } from "../store/api/payment-slice";
import { useAppSelector } from "../store/hooks";

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_URL);

const Checkout = () => {
  const rooms = useAppSelector((state) => state.tempBook.bookDetail?.rooms);
  console.log(rooms);
  console.log(rooms);
  const { data, isLoading, isError } = useCreatePaymentQuery(rooms, {
    skip: !rooms,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log("ERROR");
  }
  console.log(data);

  type Theme = "stripe" | "night" | "flat" | "none" | undefined;

  const appearance: { theme: Theme } = {
    theme: "stripe",
  };

  const options = {
    clientSecret: data && data.clientSecret && data.clientSecret,
    appearance,
  };

  return (
    <>
      {data && data.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            data={{ payment_intent_client_secret: data.clientSecret }}
          />
          )
        </Elements>
      )}
    </>
  );
};

export default Checkout;
