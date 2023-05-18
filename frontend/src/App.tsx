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
import VerifyAdmin from "./utils/VerifyAdmin";
import Dashboard from "./pages/AdminSection/Dashboard";
import { useAppSelector } from "./store/hooks";
import { UserType } from "./components/types/types";
import UserManagement from "./pages/AdminSection/UserManagement";
import HotelManagement from "./pages/AdminSection/HotelManagement";
import Booking from "./components/Booking";
import UserListings from "./components/UserListings";

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_URL);
function App() {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  return (
    <Elements stripe={stripePromise}>
      <div>
        {(!user || user?.user_type !== UserType.ADMIN) && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels/find" element={<SearchedResults />} />
          <Route element={<RequireAuth />}>
            // <Route path="/profile" element={<Profile />} />
            <Route
              path="/hotel/:hotelId/:userId/payment"
              element={<Checkout />}
            />
            <Route path="/add-property" element={<ListProperties />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/bookings/:id" element={<Booking />} />
            <Route path="/listings/:id" element={<UserListings />} />
            <Route element={<VerifyAdmin />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<UserManagement />} />
              <Route path="/hotels" element={<HotelManagement />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Elements>
  );
}

export default App;
