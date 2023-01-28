import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  loginCredentials,
  registrationData,
} from "../../components/types/types";
import { authActions } from "../auth-slice";
import { apiSlice } from "./apiSlice";

export const authenticationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    verifyLogin: build.mutation({
      query: (loginInfo: loginCredentials) => ({
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

export const { useVerifyLoginMutation } = authenticationApiSlice;
export const { useRegisterUserMutation } = authenticationApiSlice;
export const { useLogoutUserMutation } = authenticationApiSlice;
export const { useVerifyEmailMutation } = authenticationApiSlice;
