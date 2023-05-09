import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPayment } from "../components/types/types";

const initialState: IPayment = {};

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    setPaymentIntentId(
      state,
      action: PayloadAction<{ paymentIntentId: string }>
    ) {
      const { paymentIntentId } = action.payload;
      state.paymentIntentId = paymentIntentId;
    },
  },
});

export const paymentActions = paymentSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default paymentSlice.reducer;
