import { Avatar, Box, Container, Snackbar, Alert } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { LoginInformation } from "../components/types/types";
import { useVerifyLoginMutation } from "../store/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/auth-slice";
import { TokenState } from "../components/types/types";

const Login = () => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [verifyLogin, { data: tokens, isLoading, error }] =
    useVerifyLoginMutation();
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
      .then(() => dispatch(authActions.setCredentials(tokens)))
      .then(() => nav("/", { state: { open: true } }))
      .catch(() => {
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
