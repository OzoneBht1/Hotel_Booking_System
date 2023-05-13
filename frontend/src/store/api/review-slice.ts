import { apiSlice } from "./apiSlice";
import { IHotelReview } from "../../components/types/types";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<IHotelReview[], { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}/reviews`,
        method: "GET",
      }),
    }),
    getReviewsByHotelUser: build.query<
      IHotelReview[],
      { userId?: string; hotelId?: string }
    >({
      query: ({ userId, hotelId }) => ({
        url: `${hotelId}/reviews/user/${userId}`,
        method: "GET",
      }),
    }),
    getReviewsByHotelNotUser: build.query<
      IHotelReview[],
      { userId?: string; hotelId?: string }
    >({
      query: ({ userId, hotelId }) => ({
        url: `${hotelId}/reviews/not-by-user/${userId}`,
        method: "GET",
      }),
    }),
    getUserCanReview: build.query<
      { hasPermission: boolean },
      { userId: number; hotelId: string }
    >({
      query: ({ userId, hotelId }) => ({
        url: `${hotelId}/reviews/${userId}/has-perm`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewsByHotelUserQuery,
  useGetReviewsByHotelNotUserQuery,
  useGetUserCanReviewQuery,
} = reviewApiSlice;
