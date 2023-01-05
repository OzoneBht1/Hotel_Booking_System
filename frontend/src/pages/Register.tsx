import React, { useEffect } from "react";
import { Avatar, Box, Container, Snackbar, Alert, Stack } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { RegistrationInformation } from "../components/types/types";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import {
  useRegisterUserMutation,
  useVerifyEmailMutation,
} from "../store/api/apiSlice";
import RegisterPageIllustration from "../assets/RegisterpageIllustration.png";
import { useMultistepForm } from "../hooks/use-multistep-form";
import ImageForm from "../components/forms/ImageForm";
import VerifyEmail from "../components/VerifyEmail";

let errorText: string | undefined;
const STEPS_TITLE = [
  "Fill the form",
  "Add a profile picture",
  "Confirm your email",
];

let providedEmail = "";
const Register = () => {
  const [registerUser, { error, isLoading }] = useRegisterUserMutation();
  const [open, setOpen] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [completed, setCompleted] = useState(false);
  const nav = useNavigate();
  const [verifyEmail, { isLoading: verificationApiIsLoading, isSuccess }] =
    useVerifyEmailMutation();

  const [data, setData] = useState<RegistrationInformation | null>(null);
  console.log(data);

  useEffect(() => {
    providedEmail = data?.email || "";
  }, [data?.email]);

  useEffect(() => {
    if (completed) {
      submitData(data!);
    }
  }, [completed]);

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
    console.log(image);
    setData((prevData) => {
      if (prevData && image) {
        return { ...prevData, image };
      }
      return prevData;
    });

    setCompleted(true);
  };

  const backHandler = () => {
    prev();
  };

  const codeReceiveHandler = (email: string, code: string) => {
    verifyEmail({ email, code })
      .unwrap()
      .then(() => {
        nav("/login", { state: { open: true } });
      });
  };

  const { steps, currentStepIndex, next, prev } = useMultistepForm([
    <RegisterForm onReceiveData={formReceiveHandler} data={data} />,
    <ImageForm
      onReceiveImage={imageReceiveHandler}
      loading={isLoading}
      onBack={backHandler}
    />,
    <VerifyEmail
      email={providedEmail}
      onCodeReceieve={codeReceiveHandler}
      isLoading={verificationApiIsLoading}
    />,
  ]);

  const submitData = (data: RegistrationInformation) => {
    console.log("HERE");
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password2", data.password2);
    formData.append("country", data.country);
    formData.append("gender", data.gender);
    if (data.image) {
      formData.append("image", data.image, data.image.name);
    } else {
      formData.append("image", "");
    }

    console.log(data.image);
    console.log(formData.get("image"));
    for (const value of formData.values()) {
      console.log(value);
    }

    registerUser(formData)
      .unwrap()
      .then(() => next())
      .then(() => setSuccessSnackbar(true))
      .catch((err: Error) => {
        console.log(err);
        setOpen(true);
        setCompleted(false);
        prev();
      });
  };

  const StyledBox = styled(Box)({
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  });
  return (
    <Stack
      flexDirection="row"
      marginTop={-1}
      // height={`calc(100vh - ${HEIGHT_OF_NAVBAR}px)`}
      height="100vh"
    >
      {successSnackbar && (
        <Snackbar
          open={successSnackbar}
          autoHideDuration={6000}
          onClose={() => setSuccessSnackbar(false)}
        >
          <Alert
            onClose={() => setSuccessSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully registered! Verify your email to proceed.
          </Alert>
        </Snackbar>
      )}

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
