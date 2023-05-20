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
        room_count = 1,
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
          ordering,
          limit: 10,
          offset: (page - 1) * 10,
          min_price,
          max_price,
          min_score,
          max_score,
          room_count,
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
    hotelsByPartner: build.query<IPaginated<IHotelData>, IHotelQuery>({
      query: ({ search = "", ordering, limit = 10, page = 1 }) => ({
        url: "/hotels/listings/",
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

    getRooomsByHotel: build.query<IPaginated<IHotelRoom>, { id: number }>({
      query: ({ id }) => ({
        url: `/hotels/${id}/rooms`,
        method: "GET",
      }),
    }),
    getALlUnApprovedHotels: build.query<IPaginated<IHotelData>, IHotelQuery>({
      query: ({ search = "", ordering, limit = 10, page = 1 }) => ({
        url: "/hotels/unapproved",
        method: "GET",
        include: "credentials",
        params: {
          search,
          ordering,

          limit,
          offset: page * limit,
        },
      }),

      providesTags: ["UnApprovedHotels"],
    }),
    sendContract: build.mutation<any, { email: string }>({
      query: (body) => ({
        url: `/hotels/send-contract`,
        method: "POST",
        body: body,
      }),
    }),
    approveHotel: build.mutation<any, { hotelId: number }>({
      query: ({ hotelId }) => ({
        url: `/hotel/${hotelId.toString()}/approve-reject`,
        method: "PUT",
      }),
      invalidatesTags: ["UnApprovedHotels"],
    }),
    rejectHotel: build.mutation<any, { hotelId: number }>({
      query: ({ hotelId }) => ({
        url: `/hotel/${hotelId.toString()}/approve-reject`,
        method: "DELETE",
      }),
      invalidatesTags: ["UnApprovedHotels"],
    }),
    updateAmenities: build.mutation<
      any,
      { hotelId: number; amenities: string[] }
    >({
      query: ({ hotelId, amenities }) => ({
        url: `/hotel/${hotelId.toString()}/update-amenities/`,
        method: "PUT",
        body: amenities,
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
  useHotelsByPartnerQuery,
  useGetFaqsQuery,
  useCreateHotelMutation,
  useGetRooomsByHotelQuery,
  useGetAllHotelsQuery,
  useGetALlUnApprovedHotelsQuery,
  useSendContractMutation,
  useApproveHotelMutation,
  useRejectHotelMutation,
  useUpdateAmenitiesMutation,
} = hotelApiSlice;
