import { apiSlice } from "./apiSlice";
import { ISearchResult } from "../../components/types/types";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    hotelSearch: build.mutation<
      ISearchResult,
      { q?: string | number; limit?: number }
    >({
      query: ({ q = "", limit = "" }) => ({
        url: `hotels/search?q=${q}&limit=${limit}`,
        method: "GET",
        include: "credentials",
      }),
    }),
  }),
});

export const { useHotelSearchMutation } = hotelApiSlice;
