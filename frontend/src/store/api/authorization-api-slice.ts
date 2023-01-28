import { apiSlice } from "./apiSlice";
import { UserDetails } from "../../components/types/types";

export const authenticationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    userDetail: build.query<UserDetails, number>({
      query: (id: number) => ({
        url: `user/${id}/`,
        method: "GET",
        include: "credentials",
      }),
    }),
  }),
});

export const { useUserDetailQuery } = authenticationApiSlice;
