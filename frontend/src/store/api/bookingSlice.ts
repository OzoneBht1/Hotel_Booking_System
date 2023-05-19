import {
  ITempBookingResponse,
  IBookingCreate,
  ITempBookingSet,
  ITempBookingRequests,
  IPaginated,
  IBookingQuery,
} from "../../components/types/types";
import { apiSlice } from "./apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    setBookClickedHistory: build.mutation<
      { message: string; status: number },
      ITempBookingSet
    >({
      query: (data) => ({
        url: `/hotels/${data.hotel}/create-temp-booking/${data.user}/`,
        method: "POST",
        include: "booking",
        body: data,
      }),
    }),
    getBookClickedHistory: build.query<
      ITempBookingResponse,
      ITempBookingRequests
    >({
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
    deleteTempBooking: build.mutation<
      { message: string; status: number },
      ITempBookingRequests
    >({
      query: (data) => ({
        url: `/hotels/${data.hotel}/delete-temp-booking/${data.user}/`,
        method: "DELETE",
        include: "booking",
      }),
    }),
    getBookingsByUser: build.query<IPaginated<IBookingCreate>, IBookingQuery>({
      query: ({ user_id, search, ordering, limit = 10, page }) => ({
        url: `/booking/${user_id}`,
        method: "GET",
        include: "booking",
        params: {
          search,
          ordering,
          limit,
          offset: page * limit,
        },
      }),
    }),
    getLatestBooking: build.query<IBookingCreate, null>({
      query: () => ({
        url: `/latest-booking/`,
        method: "GET",
        include: "booking",
      }),
    }),
  }),
});

export const {
  useSetBookClickedHistoryMutation,
  useGetBookClickedHistoryQuery,
  useCreateBookingMutation,
  useDeleteTempBookingMutation,
  useGetBookingsByUserQuery,
  useGetLatestBookingQuery,
} = bookingApiSlice;
