import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ListProperties from "./pages/ListProperties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RequireAuth from "./utils/RequireAuth";
import Error from "./pages/404";
import HotelPage from "./pages/HotelPage";
import "./App.css";
import SearchedResults from "./pages/SearchedResults";
import Checkout from "./pages/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BASEURL } from "./store/api/apiSlice";

const stripePromise = loadStripe(
  "pk_test_51MxBFkCy9gSJx0JSTO2RxgluH3sKs2l3evvd2vDcS3jls9QaiAskHI2V6C6H9RX9VPFA2jB0rz51CZZ8ZsYe6umo00M1l0ls2f"
);
function App() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels/find" element={<SearchedResults />} />
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/hotel/:id/:roomId/payment" element={<Checkout />} />

            <Route path="/add-property" element={<ListProperties />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Elements>
  );
}

export default App;
