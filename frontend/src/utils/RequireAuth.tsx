import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const RequireAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
