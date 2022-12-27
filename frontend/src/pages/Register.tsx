import React, { useEffect } from "react";
import { Avatar, Box, Container, Snackbar, Alert, Stack } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  LoginInformation,
  RegistrationInformation,
  FormInformation,
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
import { useMultistepForm } from "../hooks/use-multistep-form";
import ImageForm from "../components/forms/ImageForm";
import { LoadingButton } from "@mui/lab";
import VerifyEmail from "../components/VerifyEmail";

let errorText: string | undefined;
let HEIGHT_OF_NAVBAR = 75;
const STEPS_TITLE = [
  "Fill the form",
  "Add a profile picture",
  "Confirm your email",
];

let providedEmail = "";
const Register = () => {
  const [registerUser, { error, isLoading }] = useRegisterUserMutation();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const [data, setData] = useState<RegistrationInformation | null>(null);

  useEffect(() => {
    providedEmail = data?.email || "";
  }, [data?.email]);

  if (error) {
    // either FetchBaseQueryError or SerializedError
    if ("status" in error) {
      // FetchBaseQueryError
      errorText =
        "error" in error
          ? "There is a problem with the server. Please try again later."
          : Object.values<string>(error.data as {})[0];
    } else {
      // SerializedError
      errorText = error.message;
    }
  }

  const formReceiveHandler = (formData: RegistrationInformation) => {
    setData((prevData) => {
      if (prevData && prevData.image) {
        return { ...formData, image: prevData.image };
      } else {
        return { ...formData, image: null };
      }
    });
    next();
  };

  const imageReceiveHandler = (image: File | null) => {
    if (image && data) {
      console.log("Hi mom");
      setData((prevData) => {
        if (prevData) {
          console.log("Hi dad");
          return { ...prevData, image };
        }
        return prevData;
      });
    }

    next();
    formSubmitHandler(data!);
  };

  const { steps, currentStepIndex, next, prev } = useMultistepForm([
    <RegisterForm onReceiveData={formReceiveHandler} isLoading={isLoading} />,
    <ImageForm onReceiveImage={imageReceiveHandler} />,
    // pass email as prop to verify email once it gets value
    <VerifyEmail email={providedEmail} />,
  ]);

  const formSubmitHandler = (data: RegistrationInformation) => {
    console.log(data);
    registerUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      password2: data.password2,
      country: data.country,
      gender: data.gender,
      image: data.image,
    })
      .unwrap()
      // .then(() => nav("/login", { state: { open: true } }))
      .then(() => next())
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
      // height={`calc(100vh - ${HEIGHT_OF_NAVBAR}px)`}
      height="100vh"
    >
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorText}
          </Alert>
        </Snackbar>
      )}
      <Stack
        component="aside"
        width="50%"
        sx={{
          backgroundImage: `url(${RegisterPageIllustration})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "flex" },
          height: "100%",
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
          {steps[currentStepIndex]}

          <Stepper activeStep={currentStepIndex} alternativeLabel>
            {STEPS_TITLE.map((label) => (
              <Step>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </StyledBox>
      </Stack>
    </Stack>
  );
};

export default Register;
