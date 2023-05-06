import { apiSlice } from "./apiSlice";
import {
  IPaginated,
  IUserData,
  IUserQuery,
  UserType,
} from "../../components/types/types";

export const authenticationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    userDetail: build.query<IUserData, number>({
      query: (id: number) => ({
        url: `user/${id}/`,
        method: "GET",
        include: "credentials",
      }),
    }),

    getAllUsers: build.query<IPaginated<IUserData>, IUserQuery>({
      query: ({ search = "", user_type, ordering, limit = 30, page = 1 }) => ({
        url: "users",
        method: "GET",
        include: "credentials",
        params: {
          search,
          user_type,
          ordering,
          limit,
          offset: (page - 1) * limit,
        },
      }),
    }),
  }),
});

export const { useUserDetailQuery, useGetAllUsersQuery } =
  authenticationApiSlice;
