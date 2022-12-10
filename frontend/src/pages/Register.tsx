import React from "react";
import { Avatar, Box, Container, Snackbar, Alert } from "@mui/material";
import LoginForm from "../components/LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import {
  LoginInformation,
  RegistrationInformation,
} from "../components/types/types";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authActions } from "../store/auth-slice";
import { TokenState } from "../components/types/types";
import RegisterForm from "../components/RegisterForm";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../store/api/apiSlice";

let errorText: string | undefined;
const Register = () => {
  const [registerUser, { error, isLoading }] = useRegisterUserMutation();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  if (error) {
    // either FetchBaseQueryError or SerializedError
    if ("status" in error) {
      // FetchBaseQueryError
      errorText =
        "error" in error
          ? "There is a problem with the server. Please try again later."
          : JSON.stringify(error.data);
    } else {
      // SerializedError
      errorText = error.message;
    }
  }

  const formSubmitHandler = (data: RegistrationInformation) => {
    registerUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      password2: data.password2,
      country: data.country,
      gender: data.gender,
    })
      .unwrap()
      .then(() => nav("/login", { state: { open: true } }))
      .catch((err: Error) => {
        console.log(err);
        setOpen(true);
      });
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
          Sign Up
        </Typography>
        {error && <p>{errorText}</p>}
        <RegisterForm onReceiveData={formSubmitHandler} isLoading={isLoading} />
      </StyledBox>
    </Container>
  );
};

export default Register;
