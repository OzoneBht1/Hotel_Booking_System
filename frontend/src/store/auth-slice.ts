import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenState, AuthState } from "../components/types/types";

const initialState: AuthState = {
  authTokens: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ authTokens: TokenState }>) {
      const { authTokens } = action.payload;
      state.authTokens = authTokens;
    },
    logOut(state) {
      state.authTokens = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
