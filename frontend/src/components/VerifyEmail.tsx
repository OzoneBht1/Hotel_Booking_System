import React from "react";
import { useVerifyEmailQuery } from "../store/api/apiSlice";

interface VerifyEmailProps {
  email: string;
}

const VerifyEmail = ({ email }: VerifyEmailProps) => {
  const { data, error, isLoading } = useVerifyEmailQuery(email);

  console.log(email, "email");
  return <div>{email}</div>;
};

export default VerifyEmail;
