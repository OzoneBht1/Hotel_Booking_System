import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { TokenState, AuthState } from "../components/types/types";

const initialState: AuthState = {
  authTokens: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")!)
    : null,
  // authTokens: null,
  user: localStorage.getItem("authTokens")
    ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")!)?.access)
    : null,
  // user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ authTokens: TokenState }>) {
      console.log(action.payload);
      const { authTokens } = action.payload;
      console.log("DISPATCHED");

      state.authTokens = action.payload.authTokens;

      if (authTokens) {
        state.user = jwt_decode(authTokens.access);
      }

      localStorage.setItem("authTokens", JSON.stringify(authTokens));
    },
    logOut(state) {
      state.authTokens = null;
      state.user = null;
      localStorage.removeItem("authTokens");
    },
  },
});

export const authActions = authSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default authSlice.reducer;
