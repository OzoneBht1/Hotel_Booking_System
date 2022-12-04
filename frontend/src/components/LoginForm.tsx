import React, { useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { Box } from "@mui/material/";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoginInformation } from "./types/types";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import useInput from "../hooks/use-input";
import { Alert, Snackbar } from "@mui/material";

interface LoginFormProps {
  onReceiveData: (data: LoginInformation) => void;
  isLoading?: boolean;
  errorText?: string;
}

const LoginForm = ({ onReceiveData, isLoading, errorText }: LoginFormProps) => {
  const [open, setOpen] = useState(false);
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

  // const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetEmailInput();
    resetPasswordInput();

    console.log(emailInputHasError, passwordInputHasError);
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
    <Box component="form" onSubmit={submitHandler}>
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
            Invalid username or password
          </Alert>
        </Snackbar>
      )}
      <TextField
        value={emailValue}
        error={emailInputHasError}
        margin="normal"
        required
        fullWidth
        label="Email Address"
        helperText="This field is required"
        onChange={emailChangedHandler}
        // autoFocus
        onBlur={emailBlurHandler}
      />
      <TextField
        value={passwordValue}
        margin="normal"
        error={passwordInputHasError}
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        helperText="This field is required"
        onBlur={passwordBlurHandler}
        onChange={passwordChangedHandler}
      />
      {/* {isLoading && (
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
      )} */}

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
