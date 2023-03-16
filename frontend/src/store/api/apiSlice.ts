import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITokenState } from "../../components/types/types";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { authActions } from "../auth-slice";

export const BASEURL = "http://localhost:8000";
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASEURL}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authTokens");
    const tokenObj: ITokenState = JSON.parse(token as string);
    if (token) {
      // checkToken(tokenObj);

      headers.set("authorization", `Bearer ${tokenObj.access}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const tokens = localStorage.getItem("authTokens");
    const tokenObj: ITokenState = JSON.parse(tokens as string);
    console.log(tokens);
    console.log(args, api, extraOptions);
    console.log(tokenObj);
    const refreshResult = await baseQuery(
      {
        url: "token/refresh/",
        method: "POST",
        body: {
          refresh: tokenObj.refresh,
        },
      },
      api,
      extraOptions
    );

    console.log(refreshResult);
    if (refreshResult.data) {
      const refreshResultData = refreshResult.data as { access: string };
      console.log(refreshResult.data);
      localStorage.setItem(
        "authTokens",
        JSON.stringify({
          access: refreshResultData.access,
          refresh: tokenObj.refresh,
        })
      );
      api.dispatch(
        authActions.setCredentials({
          authTokens: {
            access: refreshResultData.access,
            refresh: tokenObj.refresh,
          },
        })
      );

      return baseQuery(args, api, extraOptions);
    }
  }

  // if (result.error) {
  //   const token = localStorage.getItem("authTokens");
  //   const tokenObj: tokenState = JSON.parse(token as string);

  //   const token = await baseQuery("token/refresh/", api, extraOptions);

  //   localStorage.setItem("authTokens", JSON.stringify(newToken));
  //   return api.baseQuery(args, api, extraOptions);
  // }
  return result;
  // return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "api",
  endpoints: () => ({}),
});
