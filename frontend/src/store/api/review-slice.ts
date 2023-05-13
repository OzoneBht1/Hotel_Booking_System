import { apiSlice } from "./apiSlice";
import { IHotelReview } from "../../components/types/types";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<IHotelReview[], { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}/reviews`,
        method: "GET",
        providesTags: ["Review"],
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
      providesTags: ["UserReviews"],
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

      providesTags: ["UserReviews"],
    }),
    getSingleBooking: build.query<any, any>({
      query: ({ userId, hotelId }) => ({
        url: `booking/${hotelId}/${userId}`,
        method: "GET",
      }),
    }),
    createReview: build.mutation<any, any>({
      query: (review) => ({
        url: `${review.hotel}/reviews/${review.user}/create-review`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["UserReviews"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewsByHotelUserQuery,
  useGetReviewsByHotelNotUserQuery,
  useGetUserCanReviewQuery,
  useGetSingleBookingQuery,
  useCreateReviewMutation,
} = reviewApiSlice;
