import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { TokenState, AuthState } from "../components/types/types";

const initialState: AuthState = {
  authTokens: null,
  // user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ authTokens: TokenState }>) {
      const { authTokens } = action.payload;
      state.authTokens = authTokens;
      // state.user = jwtDecode(authTokens.access);
    },
    logOut(state) {
      state.authTokens = null;
      // state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default authSlice.reducer;
