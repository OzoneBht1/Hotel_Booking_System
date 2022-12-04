import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import apiReducer, { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
