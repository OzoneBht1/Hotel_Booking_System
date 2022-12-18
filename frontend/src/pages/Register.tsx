import React from "react";
import { Avatar, Box, Container, Snackbar, Alert, Stack } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
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
import RegisterForm from "../components/forms/RegisterForm";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../store/api/apiSlice";
import RegisterPageIllustration from "../assets/RegisterpageIllustration.png";

let errorText: string | undefined;
let HEIGHT_OF_NAVBAR = 64;
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
    <Stack
      flexDirection="row"
      marginTop={-1}
      height={`calc(100vh - ${HEIGHT_OF_NAVBAR}px)`}
    >
      <Stack
        component="aside"
        width="50%"
        sx={{
          backgroundImage: `url(${RegisterPageIllustration})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "flex" },
        }}
      ></Stack>
      <Stack
        component="main"
        width={{ xs: "100%", sm: "60%", md: "50%" }}
        padding={0}
      >
        <StyledBox>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <RegisterForm
            onReceiveData={formSubmitHandler}
            isLoading={isLoading}
          />
        </StyledBox>
      </Stack>
    </Stack>
  );
};

export default Register;
