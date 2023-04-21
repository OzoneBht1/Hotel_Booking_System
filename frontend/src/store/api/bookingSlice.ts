import { IRoomWithQuantity, ITempBooking } from "../../components/types/types";
import { apiSlice } from "./apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    setBookClickedHistory: build.mutation<
      { message: string; status: number },
      ITempBooking
    >({
      query: (roomDetails) => ({
        url: `/hotels/${roomDetails.hotel_id}/create-temp-booking/${roomDetails.user_id}`,
        method: "POST",
        include: "booking",
        body: roomDetails,
      }),
    }),
  }),
});

export const { useSetBookClickedHistoryMutation } = bookingApiSlice;
