import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { positionStackKey } from "../../secret/positionStackKey";

// Define a service using a base URL and expected endpoints
export const positionStackSlice = createApi({
  reducerPath: "positionStackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.positionstack.com/v1/" }),

  endpoints: (builder) => ({
    getLocationDetail: builder.query<any, { lat?: number; lng?: number }>({
      query: ({ lat, lng }) => ({
        url: "reverse/",
        params: {
          access_key: positionStackKey,
          query: `${lat},${lng}`,
        },
      }),
    }),
  }),
});

export const { useGetLocationDetailQuery } = positionStackSlice;
