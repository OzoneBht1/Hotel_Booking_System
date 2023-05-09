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
    createPayment: build.query<any, any>({
      query: (data: any) => ({
        url: "http://localhost:8000/payment/test-payment/",
        method: "POST",
        include: "payment",
        body: data,
      }),
    }),
    retrievePayment: build.query<any, string>({
      query: (secret) => ({
        url: `http://localhost:8000/payment/retrieve-payment/`,
        method: "GET",
        include: "payment",
        params: {
          secret: secret,
        },
      }),
    }),
  }),
});

export const {
  useSaveStripeInfoMutation,
  useCreatePaymentQuery,
  useRetrievePaymentQuery,
} = paymentSlice;
