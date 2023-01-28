import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tokenState } from "../../components/types/types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authTokens");
    const tokenObj: tokenState = JSON.parse(token as string);
    console.log(tokenObj);
    if (token) {
      headers.set("authorization", `Bearer ${tokenObj.access}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  reducerPath: "api",
  endpoints: () => ({}),
});
