import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginInformation,
  RegistrationInformation,
} from "../../components/types/types";
import { authActions } from "../auth-slice";

const BASE_URL = "http://localhost:8000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    verifyLogin: build.mutation({
      query: (loginInfo: LoginInformation) => ({
        url: "token/",
        method: "POST",
        body: { email: loginInfo.email, password: loginInfo.password },
        include: "credentials",
      }),
    }),
    registerUser: build.mutation({
      query: (formData: FormData) => ({
        url: "register/",
        method: "POST",
        // headers: {
        //   "Content-Type": `multipart/form-data; boundary=`,
        // },
        body: formData,
        include: "credentials",
      }),
    }),
    logoutUser: build.mutation<void, void>({
      query: () => ({
        url: "logout/",
        method: "GET",
      }),
    }),
    verifyEmail: build.mutation({
      query: ({ email, code }) => ({
        url: "verify/",
        method: "POST",
        body: { email: email, code: code as number },
      }),
    }),
  }),
});

export const { useVerifyLoginMutation } = apiSlice;
export const { useRegisterUserMutation } = apiSlice;
export const { useLogoutUserMutation } = apiSlice;
export const { useVerifyEmailMutation } = apiSlice;

export default apiSlice.reducer;
