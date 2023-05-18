import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutForm from "../components/Checkout/Checkout";
import Loading from "../components/Loading";
import { ITempBookingModifiedFormat } from "../components/types/types";
import { useGetBookClickedHistoryQuery } from "../store/api/bookingSlice";
import { useCreatePaymentQuery } from "../store/api/payment-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { roomActions } from "../store/roomSlice";
import { tempBookActions } from "../store/tempBookSlice";
import { convertFormat, getDays } from "../utils/RoomUtils";
// import { convertFormat } from "../utils/RoomUtils";

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_URL);

let stayDuration = 0;
const Checkout = () => {
  const { hotelId, userId } = useParams();
  const dispatch = useAppDispatch();

  const nav = useNavigate();

  const {
    data: bookRoomsDetails,
    isLoading: bookRoomsIsLoading,
    isError: bookRoomsIsError,
    isSuccess: bookRoomsIsSuccess,
  } = useGetBookClickedHistoryQuery(
    { hotel: hotelId as string, user: userId as string },
    {
      skip: !hotelId || !userId,
    }
  );

  if (bookRoomsDetails) {
    stayDuration = getDays(
      bookRoomsDetails.check_in,
      bookRoomsDetails.check_out
    );
  }
  const { data, isLoading, isError } = useCreatePaymentQuery(
    bookRoomsDetails &&
      ({
        data: convertFormat(bookRoomsDetails),
        stayDuration: stayDuration,
      } as any),

    {
      skip: !bookRoomsIsSuccess,
    }
  );
  // if (bookRoomsIsError) {
  //   nav("/error");
  // }
  //
  // if (bookRoomsIsLoading) {
  //   return <Loading />;
  // }

  if (isLoading || bookRoomsIsLoading) {
    return <Loading />;
  }

  if (isError || bookRoomsIsError) {
    console.log("ERROR");
  }
  console.log(data);

  // dispatch(
  //   tempBookActions.setTempBooking({
  //     bookDetail: convertFormat(bookRoomsDetails!),
  //   })
  // );

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
          {data && bookRoomsDetails && (
            <CheckoutForm
              data={{ paymentIntentClientSecret: data.clientSecret }}
              booking={convertFormat(bookRoomsDetails)}
            />
          )}
          )
        </Elements>
      )}
    </>
  );
};

export default Checkout;
