import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHotelData } from "../components/types/types";

interface IHistoryInitialState {
  hotels: IHotelData[];
}

const initialState: IHistoryInitialState = {
  hotels: [],
};

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    setRecommendations(
      state,
      action: PayloadAction<{ hotelData: IHotelData[] }>
    ) {
      state.hotels = action.payload.hotelData;
    },
  },
});

export const historyActions = historySlice.actions;
export default historySlice.reducer;
