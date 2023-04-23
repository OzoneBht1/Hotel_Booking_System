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

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_URL);
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
            <Route
              path="/hotel/:hotelId/:userId/payment"
              element={<Checkout />}
            />

            <Route path="/add-property" element={<ListProperties />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Elements>
  );
}

export default App;
