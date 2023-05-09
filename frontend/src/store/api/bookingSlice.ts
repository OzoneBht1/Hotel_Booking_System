import {
  ITempBookingResponse,
  ITempBookingGet,
  IBookingCreate,
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
    createBooking: build.mutation<
      { message: string; status: number },
      IBookingCreate
    >({
      query: (data) => ({
        url: `/hotels/${data.hotel}/create-booking/${data.user}/`,
        method: "POST",
        include: "booking",
        body: data,
      }),
    }),
  }),
});

export const {
  useSetBookClickedHistoryMutation,
  useGetBookClickedHistoryQuery,
  useCreateBookingMutation,
} = bookingApiSlice;
