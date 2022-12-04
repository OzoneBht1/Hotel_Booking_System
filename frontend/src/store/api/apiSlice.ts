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
    }),
  }),
});

export const { useVerifyLoginMutation } = apiSlice;

export default apiSlice.reducer;
