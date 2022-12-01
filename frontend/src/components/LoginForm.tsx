import React, { useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { verifyLogin } from "../store/api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoginInformation } from "./types/types";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
interface LoginFormProps {
  onReceiveData: (data: LoginInformation) => void;
  isLoading?: boolean;
  errorText?: string;
}

const LoginForm = ({ onReceiveData, isLoading, errorText }: LoginFormProps) => {
  const [err, setErr] = useState(errorText ? true : false);
  const [emailwasTouched, setEmailWasTouched] = useState(false);
  const [passwordwasTouched, setPasswordWasTouched] = useState(false);

  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailTouchHandler = () => {
    setEmailWasTouched(true);
  };

  const passwordTouchHandler = () => {
    setPasswordWasTouched(true);
  };

  // console.log("wasTouched", wasTouched);
  console.log("err", err);
  let emailDisplayError = !emailwasTouched && err;
  let passwordDisplayError = !passwordwasTouched && err;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailWasTouched(false);
    setPasswordWasTouched(false);
    onReceiveData({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });
  };
  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box component="form" onSubmit={submitHandler}>
      <TextField
        inputRef={emailRef}
        error={emailDisplayError}
        margin="normal"
        required
        fullWidth
        label="Email Address"
        helperText="This field is required"
        onKeyDown={emailTouchHandler}
      />
      <TextField
        inputRef={passwordRef}
        margin="normal"
        error={passwordDisplayError}
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        helperText="This field is required"
        onKeyDown={passwordTouchHandler}
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
