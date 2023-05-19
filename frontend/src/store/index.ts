import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import listReducer from "./list-slice";
import roomReducer from "./roomSlice";
import paymentReducer from "./paymentSlice";
import tempBookReducer from "./tempBookSlice";
import historyReducer from "./history-slice";
import { apiSlice } from "./api/apiSlice";
import { paymentSlice } from "./api/payment-slice";
import { reviewApiSlice } from "./api/review-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
    room: roomReducer,
    tempBook: tempBookReducer,
    paymentRed: paymentReducer,
    history: historyReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [paymentSlice.reducerPath]: paymentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      paymentSlice.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
