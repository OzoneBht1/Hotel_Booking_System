import { Avatar, Box, Container } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { LoginInformation } from "../components/types/types";
import { useVerifyLoginMutation } from "../store/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import {LoadingSpinner}

const Login = () => {
  const nav = useNavigate();

  const [verifyLogin, { data, isLoading, error }] = useVerifyLoginMutation();
  let errorText: string | undefined = "";

  if (error) {
    // either FetchBaseQueryError or SerializedError
    if ("status" in error) {
      // FetchBaseQueryError
      errorText =
        "error" in error
          ? "There is a problem with the server. Please try again later."
          : "Invalid username or password";
    } else {
      // SerializedError
      errorText = error.message;
    }
  }

  console.log(errorText);

  // text =

  const loginDataHandler = async (data: LoginInformation) => {
    await verifyLogin({ email: data.email, password: data.password })
      .unwrap()
      .then(() => nav("/"))
      .catch((error) => console.log("rejected", error));
  };

  const StyledBox = styled(Box)({
    marginTop: 65,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* {error && (
          <LoginForm onReceiveData={loginDataHandler} error={error.text} />
        )} */}
        {/* {isLoading && <div>Loading...</div>} */}

        <LoginForm
          onReceiveData={loginDataHandler}
          isLoading={isLoading}
          errorText={
            errorText !== "" && errorText !== undefined ? errorText : ""
          }
        />
      </StyledBox>
    </Container>
  );
};

export default Login;
