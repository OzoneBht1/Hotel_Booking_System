import { LoadingButton } from "@mui/lab";
import { InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box/Box";
import React, { ChangeEvent, useState } from "react";
import { useVerifyEmailMutation } from "../store/api/apiSlice";
import { styled } from "@mui/system";
import ReactInputVerificationCode from "react-input-verification-code";

interface VerifyEmailProps {
  email: string;
  onCodeReceieve: (email: string, code: string) => void;
  isLoading?: boolean;
}

// const StyledTextField = styled(TextField)({
//   width: "50px",
//   height: "50px",
//   fontSize: "30px",
//   textAlign: "center",
//   margin: "0 5px",
//   "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
//     display: "none",
//   },
//   "& input[type=number]": {
//     MozAppearance: "textfield",
//   },
// });

const VerifyEmail = ({
  email,
  onCodeReceieve,
  isLoading,
}: VerifyEmailProps) => {
  const [value, setValue] = useState("");

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = value;
    console.log(email, code);
    onCodeReceieve(email, code);
  };
  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin={2}
    >
      <ReactInputVerificationCode
        autoFocus={true}
        value={value}
        onChange={(newVal) => setValue(newVal)}
      />
      <LoadingButton
        loading={isLoading}
        disabled={value.length < 4}
        type="submit"
        fullWidth
        sx={{ m: 3, flex: 3 }}
        variant="contained"
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default VerifyEmail;
