import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const PAYMENT_BASE_URL = "https://localhost:8000/payment";
export const paymentApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: PAYMENT_BASE_URL }),
  reducerPath: "payment",
  endpoints: () => ({}),
});
