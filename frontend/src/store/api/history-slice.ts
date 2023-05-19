import { apiSlice } from "./apiSlice";
import {
  IPaginated,
  IUserData,
  IUserQuery,
  UserType,
} from "../../components/types/types";

export const historySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createHistory: build.mutation<any, { user: number; hotel: number }>({
      query: (body) => ({
        url: `create-history/`,
        method: "POST",
        include: "recommend",
        body: body,
      }),
    }),
    recommendHotels: build.query<any, { user_id: number | null }>({
      query: (body) => ({
        url: `hotels/recommend-hotels/`,
        method: "POST",
        include: "recommend",
        body: body,
      }),
    }),
  }),
});

export const { useCreateHistoryMutation, useRecommendHotelsQuery } =
  historySlice;
