import { apiSlice } from "./apiSlice";
import {
  ISearchResponse,
  IHotelData,
  IQuery,
  IPaginated,
  IHotelRoom,
  IFAQ,
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
    getSearchedResults: build.query<IPaginated<IHotelData>, IQuery>({
      query: ({
        searchQuery,
        checkInDate,
        checkOutDate,
        people = 0,
        rooms = 0,
        page = 1,
      }) => ({
        url: `/hotels/hotels-by-name-location`,
        method: "GET",
        params: {
          term: searchQuery,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          people: people,
          rooms: rooms,
          limit: 10,
          offset: (page - 1) * 10,
        },
      }),
    }),
    getReviews: build.query<IPaginated<IHotelReview>, { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}/reviews`,
        method: "GET",
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
  }),
});

export const {
  useHotelSearchMutation,
  useGetHomePageItemsQuery,
  useGetHotelDetailsQuery,
  useGetSearchedResultsQuery,
  useGetReviewsQuery,
  useGetRoomsQuery,
  useGetFaqsQuery,
} = hotelApiSlice;
