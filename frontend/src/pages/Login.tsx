import {
  Avatar,
  Box,
  Container,
  Snackbar,
  Alert,
  Grid,
  Stack,
  Link,
} from "@mui/material";
import React from "react";
import LoginForm from "../components/forms/LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { LoginInformation } from "../components/types/types";
import { useVerifyLoginMutation } from "../store/api/apiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authActions } from "../store/auth-slice";
import { TokenState } from "../components/types/types";
import { useLocation } from "react-router-dom";
import LoginPageIllustration from "../assets/LoginpageIllustration.png";

let HEIGHT_OF_NAVBAR = 64;

const Login = () => {
  const { state } = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(
    state ? true : false
  );
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [verifyLogin, { error, isLoading, isSuccess }] =
    useVerifyLoginMutation();
  let errorText: string | undefined = "";

  if (error) {
    // either FetchBaseQueryError or SerializedError
    if ("status" in error) {
      // FetchBaseQueryError
      errorText =
        "error" in error
          ? "There is a problem with the server. Please try again later."
          : "Invalid email or password";
    } else {
      // SerializedError
      errorText = error.message;
    }
  }

  // text =

  const loginDataHandler = (data: LoginInformation) => {
    console.log("HELLO");
    verifyLogin({ email: data.email, password: data.password })
      .unwrap()
      .then((tokens: TokenState) =>
        dispatch(authActions.setCredentials({ authTokens: tokens }))
      )
      .then(() => nav("/", { state: { open: true } }))
      .catch((err: Error) => {
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
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully created a user!
          </Alert>
        </Snackbar>
      )}
      {open && errorText != "" && (
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
        component="main"
        width={{ xs: "100%", sm: "60%", md: "50%" }}
        padding={0}
      >
        <Stack height={"70vh"} width="100%">
          <StyledBox>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <LoginForm
              onReceiveData={loginDataHandler}
              isLoading={isLoading}
              errorText={
                errorText !== "" && errorText !== undefined ? errorText : ""
              }
            />
            <Typography margin={3}>
              Don't have an account?{" "}
              <Typography component={NavLink} to="/register">
                Register here.
              </Typography>
            </Typography>
          </StyledBox>
        </Stack>
      </Stack>

      <Stack
        component="aside"
        // sx={{ backgroundColor: "primary.main" }}

        width="50%"
        sx={{
          backgroundImage: `url(${LoginPageIllustration})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Stack
          height="70vh"
          width="90%"
          alignContent={"center"}
          justifyContent={"center"}
        />
      </Stack>
    </Stack>
  );
};

export default Login;
