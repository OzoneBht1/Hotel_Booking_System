import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITempBookingModifiedFormat } from "../components/types/types";

const initialState: { bookDetail: ITempBookingModifiedFormat | null } = {
  bookDetail: null,
};

const tempBookSlice = createSlice({
  name: "tempBook",
  initialState: initialState,
  reducers: {
    setTempBooking(
      state,
      action: PayloadAction<{ bookDetail: ITempBookingModifiedFormat }>
    ) {
      state.bookDetail = action.payload.bookDetail;
    },
  },
});

export const tempBookActions = tempBookSlice.actions;
export default tempBookSlice.reducer;
