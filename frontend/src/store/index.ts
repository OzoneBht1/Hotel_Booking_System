import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import listReducer from "./list-slice"
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    list : listReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
