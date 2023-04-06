import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListProperty } from "../components/types/types";

const initialState: IListProperty  = {
  email : "",
  hotel_name : "",
};
const listingSlice = createSlice({
  name: "listProperty",
  initialState: initialState,
  reducers: {
    setEmail(state, action: PayloadAction<{ email: string }>) {
      const { email } = action.payload;
      state.email = email;

    },
    logOut(state) {
      // state.authTokens = null;
      // state.user = null;
      // localStorage.removeItem("authTokens");
    },
  },
});

export const listActions = listingSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default listingSlice.reducer;
