import { paymentApiSlice } from "./paymentApiSlice";

export const paymentSlice = paymentApiSlice.injectEndpoints({
  endpoints: (build) => ({
    saveStripeInfo: build.mutation<any, any>({
      query: (data: any) => ({
        url: `/payments/save-stripe-info/`,
        method: "POST",
        include: "credentials",
        body: data,
      }),
    }),
  }),
});

export const { useSaveStripeInfoMutation } = paymentSlice;
