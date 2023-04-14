import { apiSlice } from "./apiSlice";
import {
  ISearchResponse,
  IHotelData,
  IQuery,
  IPaginatedReviews,
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
    getSearchedResults: build.query<any, IQuery>({
      query: ({
        searchQuery,
        checkInDate,
        checkOutDate,
        people = 0,
        rooms = 0,
      }) => ({
        url: `/hotels/hotels-by-name-location?term=${searchQuery}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&people=${people}&rooms=${rooms}`,
        method: "GET",
      }),
    }),
    getReviews: build.query<IPaginatedReviews, { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}/reviews`,
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
  useGetReviewsQuery
} = hotelApiSlice;
