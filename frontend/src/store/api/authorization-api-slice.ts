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
    updateProfile: build.mutation<any, any>({
      query: ({ formData, id }) => ({
        url: `user/${id}/update`,
        method: "PATCH",
        include: "credentials",
        body: formData,
      }),
    }),
    sendReset: build.mutation<any, any>({
      query: (id) => ({
        url: `user/${id}/send-reset`,
        method: "POST",
        include: "credentials",
      }),
    }),

    updatePassword: build.mutation<any, any>({
      query: (data) => ({
        url: `user/${data.id}/set-pass`,
        method: "PATCH",
        include: "credentials",
        body: data,
      }),
    }),

    getAllUsers: build.query<IPaginated<IUserData>, IUserQuery>({
      query: ({ search = "", user_type, ordering, limit = 10, page = 1 }) => ({
        url: "users",
        method: "GET",
        include: "credentials",
        params: {
          search,
          user_type,
          ordering,
          limit,
          offset: page * limit,
        },
      }),
    }),
  }),
});

export const {
  useUserDetailQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdatePasswordMutation,
  useSendResetMutation,
} = authenticationApiSlice;
