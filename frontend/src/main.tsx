import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./store/api/apiSlice";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* <ApiProvider api={apiSlice}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ApiProvider> */}
  </Provider>
);
