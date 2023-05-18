import { ITempBookingModifiedFormat } from "../../components/types/types";
import { paymentApiSlice } from "./paymentApiSlice";

export const paymentSlice = paymentApiSlice.injectEndpoints({
  endpoints: (build) => ({
    saveStripeInfo: build.mutation<any, any>({
      query: (data: any) => ({
        url: `http://localhost:8000/payment/create-payment/`,
        method: "POST",
        include: "payment",
        body: data,
      }),
    }),
    createPayment: build.query<
      any,
      { data: ITempBookingModifiedFormat; stayDuration: number }
    >({
      query: ({ data, stayDuration }) => ({
        url: "http://localhost:8000/payment/test-payment/",
        method: "POST",
        include: "payment",
        body: { ...data, stayDuration },
      }),
    }),
    retrievePayment: build.query<
      any,
      { secret: string; data: ITempBookingModifiedFormat }
    >({
      query: ({ secret, data }) => ({
        url: `http://localhost:8000/payment/retrieve-payment/`,
        method: "POST",
        include: "payment",
        params: {
          secret: secret,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useSaveStripeInfoMutation,
  useCreatePaymentQuery,
  useRetrievePaymentQuery,
} = paymentSlice;
