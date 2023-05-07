import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserType } from "../components/types/types";
import { useAppSelector } from "../store/hooks";

const VerifyAdmin = () => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const location = useLocation();

  return user && user?.user_type === UserType.ADMIN ? (
    <Outlet />
  ) : (
    <Navigate to="/**" state={{ from: location }} replace />
  );
};

export default VerifyAdmin;
