import { paymentApiSlice } from "./paymentApiSlice";

export const paymentSlice = paymentApiSlice.injectEndpoints({
  endpoints: (build) => ({
    saveStripeInfo: build.mutation<any, any>({
      query: (data: any) => ({
        url: `/payments/save-stripe-info/`,
        method: "POST",
        include: "payment",
        body: data,
      }),
    }),
    createPayment: build.query<any, any>({
      query: (data: any) => ({
        url: "https://localhost:8000/payment/test-payment",
        method: "POST",
        include: "payment",
        body: data,
      }),
    }),
  }),
});

export const { useSaveStripeInfoMutation, useCreatePaymentQuery } =
  paymentSlice;
