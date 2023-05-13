import { apiSlice } from "./apiSlice";
import {
  ISearchResponse,
  IHotelData,
  IQuery,
  IPaginated,
  IHotelRoom,
  IFAQ,
  IHotelQuery,
  IHotelSearchQuery,
} from "../../components/types/types";
import { IHotelReview } from "../../components/types/types";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    hotelSearch: build.mutation<
      ISearchResponse,
      { q?: string | number; limit?: number }
    >({
      query: ({ q = "", limit = "" }) => ({
        url: `hotels/search?q=${q}&limit=${limit}`,
        method: "GET",
        include: "credentials",
      }),
    }),

    getHomePageItems: build.query<IHotelData[], void>({
      query: () => ({
        url: `/hotels-by-location`,
        method: "GET",
      }),
    }),
    getHotelDetails: build.query<IHotelData, { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}`,
        method: "GET",
      }),
    }),
    getSearchedResults: build.query<IPaginated<IHotelData>, IHotelSearchQuery>({
      query: ({
        searchQuery,
        checkInDate,
        checkOutDate,
        ordering,
        people = 0,
        rooms = 0,
        page = 1,
        min_price = 0,
        max_price = 1500,
        min_score = 2.5,
        max_score = 10,
      }) => ({
        url: `/hotels/hotels-by-name-location`,
        method: "GET",
        params: {
          term: searchQuery,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          people: people,
          rooms: rooms,
          ordering,
          limit: 10,
          offset: (page - 1) * 10,
          min_price,
          max_price,
          min_score,
          max_score,
        },
      }),
    }),
    getRooms: build.query<IPaginated<IHotelRoom>, { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}/rooms`,
        method: "GET",
      }),
    }),
    getFaqs: build.query<IFAQ[], { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}/faqs`,
        method: "GET",
      }),
    }),
    createHotel: build.mutation<any, any>({
      query: (body) => ({
        url: `/hotels/create-hotel-with-detail/`,
        method: "POST",
        body: body,
      }),
    }),
    getAllHotels: build.query<IPaginated<IHotelData>, IHotelQuery>({
      query: ({ search = "", ordering, limit = 10, page = 1 }) => ({
        url: "/hotels",
        method: "GET",
        include: "credentials",
        params: {
          search,
          ordering,
          limit,
          offset: page * limit,
        },
      }),
    }),
  }),
});

export const {
  useHotelSearchMutation,
  useGetHomePageItemsQuery,
  useGetHotelDetailsQuery,
  useGetSearchedResultsQuery,
  useGetRoomsQuery,
  useGetFaqsQuery,
  useCreateHotelMutation,
  useGetAllHotelsQuery,
} = hotelApiSlice;
