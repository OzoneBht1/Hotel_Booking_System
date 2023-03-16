import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material/";
import TextField from "@mui/material/TextField";
import { ILoginCreds } from "../types/types";
import LoadingButton from "@mui/lab/LoadingButton";
import useInput from "../../hooks/use-input";
import { Alert, Snackbar } from "@mui/material";

interface LoginFormProps {
  onReceiveData: (data: ILoginCreds) => void;
  isLoading?: boolean;
  errorText?: string;
}

const LoginForm = ({ onReceiveData, isLoading, errorText }: LoginFormProps) => {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(errorText ? true : false);

  const {
    value: emailValue,
    hasError: emailInputHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: passwordValue,
    hasError: passwordInputHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length > 6);

  const keyDownHandler = () => {
    setErr(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetEmailInput();
    resetPasswordInput();

    if (emailIsValid && passwordIsValid) {
      onReceiveData({
        email: emailValue,
        password: passwordValue,
      });
    } else {
      setOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={submitHandler} padding={2}>
      <Typography
        alignSelf={"flex-start"}
        component="h1"
        variant="h5"
        margin={1}
      >
        Welcome Back!
      </Typography>
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
            Invalid username or password!
          </Alert>
        </Snackbar>
      )}
      <TextField
        value={emailValue}
        error={emailInputHasError || err}
        margin="normal"
        required
        fullWidth
        autoFocus={err}
        label="Email Address"
        InputLabelProps={{ shrink: true }}
        // this will prevent the placeholder and autofill from overlapping
        helperText={emailInputHasError ? "Please enter a valid email" : ""}
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        onKeyDown={keyDownHandler}
      />
      <TextField
        value={passwordValue}
        margin="normal"
        error={passwordInputHasError || err}
        required
        fullWidth
        name="password"
        InputLabelProps={{ shrink: true }}
        label="Password"
        type="password"
        helperText={
          passwordInputHasError ? "Please enter a valid password" : ""
        }
        onBlur={passwordBlurHandler}
        onChange={passwordChangedHandler}
        onKeyDown={keyDownHandler}
      />

      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
      >
        Sign in
      </LoadingButton>
    </Box>
  );
};

export default LoginForm;
