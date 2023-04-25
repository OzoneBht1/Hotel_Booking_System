import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useSaveStripeInfoMutation } from "../../store/api/payment-slice";
import { Stack } from "@mui/system";

interface IPaymentFormProps {
  onReceiveForm: (data: any) => void;
  data: { [key: string]: string };
}
export default function PaymentForm({ data }: IPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = data["payment_intent_client_secret"];

  console.log(clientSecret);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [saveStripeInfo, { isLoading, isError }] = useSaveStripeInfoMutation();

  useEffect(() => {
    console.log(stripe);
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log(paymentIntent);
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173",
        receipt_email: email,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };
  //
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={13}>
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.value.email)}
            />

            <PaymentElement id="payment-element" />
          </Grid>
        </Grid>
        <Stack alignItems="flex-end">
          <Button
            disabled={loading || !stripe || !elements}
            type="submit"
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            Place Order
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  );
}
