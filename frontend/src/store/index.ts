import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import { apiSlice } from "./api/apiSlice";
import { positionStackSlice } from "./api/postitionStackSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [positionStackSlice.reducerPath]: positionStackSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      positionStackSlice.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
