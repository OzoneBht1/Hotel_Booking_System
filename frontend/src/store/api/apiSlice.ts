import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginInformation } from "../../components/types/types";
import { authActions } from "../auth-slice";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (build) => ({
    verifyLogin: build.mutation({
      query: (loginInfo: LoginInformation) => ({
        url: "token/",
        method: "POST",
        body: { email: loginInfo.email, password: loginInfo.password },
        include: "credentials",
      }),
      // async onQueryStarted(loginInfo, { dispatch, queryFulfilled }) {
      //   try {
      //     const test = await queryFulfilled;
      //     return await test.data;
      //     // dispatch(authActions.setCredentials(data));
      //     // console.log(data);
      //   } catch (err) {}
      // },
    }),
  }),
});

export const { useVerifyLoginMutation } = apiSlice;
