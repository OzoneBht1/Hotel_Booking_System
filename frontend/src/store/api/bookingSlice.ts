import {
  ITempBookingResponse,
  ITempBookingGet,
} from "../../components/types/types";
import { apiSlice } from "./apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    setBookClickedHistory: build.mutation<
      { message: string; status: number },
      ITempBookingResponse
    >({
      query: (data) => ({
        url: `/hotels/${data.hotel}/create-temp-booking/${data.user}/`,
        method: "POST",
        include: "booking",
        body: data,
      }),
    }),
    getBookClickedHistory: build.query<ITempBookingResponse, ITempBookingGet>({
      query: (data) => ({
        url: `/hotels/${data.hotel}/get-temp-booking/${data.user}`,
        method: "GET",
        include: "booking",
      }),
    }),
  }),
});

export const {
  useSetBookClickedHistoryMutation,
  useGetBookClickedHistoryQuery,
} = bookingApiSlice;
