import React, { useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import { getCountries } from "./api/getCountries";
import Select from "react-select";
import { countryInformation } from "./types/types";
import { Alert, Box, Snackbar, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Typography from "@mui/material/Typography";
import useSelect from "../hooks/use-select";
import { useAppDispatch } from "../store/hooks";
import { RegistrationInformation } from "./types/types";

const GENDERS = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];

let errorText: string | undefined;

interface RegisterFormProps {
  onReceiveData: (data: RegistrationInformation) => void;
  isLoading?: boolean;
}
const RegisterForm = ({ onReceiveData, isLoading }: RegisterFormProps) => {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const {
    selectedValue: selectedCountry,
    valueChangeHandler: selectedCountryChangeHandler,
    inputBlurHandler: selectedCountryBlurHandler,
    hasError: selectedCountryHasError,
  } = useSelect();
  const {
    selectedValue: selectedGender,
    valueChangeHandler: selectedGenderChangeHandler,
    inputBlurHandler: selectedGenderBlurHandler,
    hasError: selectedGenderHasError,
  } = useSelect();

  const {
    value: lastNameValue,
    hasError: lastNameInputHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: firstNameValue,
    hasError: firstNameInputHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim().length > 0);

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
  const {
    value: password2Value,
    hasError: password2InputHasError,
    isValid: password2IsValid,
    valueChangeHandler: password2ChangedHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2Input,
  } = useInput((value) => value.trim().length > 6);

  useEffect(() => {
    const fetchCountries = async () => {
      const returnedData =
        (await getCountries()) as unknown as countryInformation[];
      const transformedCountries: { value: string; label: string }[] = [];

      returnedData.map((country) => {
        transformedCountries.push({
          value: country.name,
          label: country.name,
        });
      });
      setCountries(transformedCountries);
    };

    fetchCountries();
  }, []);

  let formIsValid: boolean = true;

  if (
    !firstNameIsValid ||
    !lastNameIsValid ||
    !emailIsValid ||
    !passwordIsValid ||
    !password2IsValid ||
    !selectedCountry ||
    !selectedGender
  ) {
    errorText = "Please fill out all fields correctly";
    formIsValid = false;
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordValue !== password2Value) {
      errorText = "The two passwords do not match.";
      formIsValid = false;
      resetPasswordInput();
      resetPassword2Input();
    }

    if (!formIsValid) {
      setOpen(true);
    } else {
      onReceiveData({
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        password: passwordValue,
        password2: password2Value,
        country: selectedCountry!,
        gender: selectedGender!,
      });
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
            {errorText}
          </Alert>
        </Snackbar>
      )}

      <Box display="flex" gap={1}>
        <TextField
          value={firstNameValue}
          error={firstNameInputHasError}
          margin="normal"
          required
          fullWidth
          autoFocus={firstNameInputHasError ? true : false}
          label="First name"
          helperText={
            firstNameInputHasError ? "Please enter your first name" : ""
          }
          onChange={firstNameChangedHandler}
          onBlur={firstNameBlurHandler}
          // onKeyDown={keyDownHandler}
        />
        <TextField
          value={lastNameValue}
          error={lastNameInputHasError}
          margin="normal"
          required
          fullWidth
          autoFocus={lastNameInputHasError ? true : false}
          label="Last name"
          helperText={
            lastNameInputHasError ? "Please enter your last name" : ""
          }
          onChange={lastNameChangedHandler}
          onBlur={lastNameBlurHandler}
          // onKeyDown={keyDownHandler}
        />
      </Box>
      <TextField
        value={emailValue}
        error={emailInputHasError}
        margin="normal"
        required
        fullWidth
        autoComplete="off"
        InputLabelProps={{ shrink: true }}
        autoFocus={emailInputHasError ? true : false}
        label="Email"
        helperText={emailInputHasError ? "Please enter a valid email" : ""}
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        // onKeyDown={keyDownHandler}
      />
      <Select
        options={GENDERS}
        onChange={selectedGenderChangeHandler}
        onBlur={selectedGenderBlurHandler}
        // maxMenuHeight={200}
        placeholder="Gender*"
      />
      {selectedGenderHasError && (
        <Typography color="error">Please select your gender</Typography>
      )}
      <Select
        options={countries}
        onChange={selectedCountryChangeHandler}
        onBlur={selectedCountryBlurHandler}
        maxMenuHeight={200}
        placeholder="Select your country...*"
      />
      {selectedCountryHasError && (
        <Typography color="error">Please select your country</Typography>
      )}
      <TextField
        value={passwordValue || ""}
        error={passwordInputHasError}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        autoComplete="off"
        autoFocus={passwordInputHasError ? true : false}
        label="Password"
        type="password"
        helperText={
          passwordInputHasError ? "Please enter a valid password" : ""
        }
        onChange={passwordChangedHandler}
        onBlur={passwordBlurHandler}
        // onKeyDown={keyDownHandler}
      />
      <TextField
        value={password2Value}
        error={password2InputHasError}
        margin="normal"
        required
        fullWidth
        autoFocus={password2InputHasError ? true : false}
        label="Retype password"
        type="password"
        helperText={
          password2InputHasError ? "Please enter a valid password" : ""
        }
        onChange={password2ChangedHandler}
        onBlur={password2BlurHandler}
        // onKeyDown={keyDownHandler}
      />

      <LoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
      >
        Sign up
      </LoadingButton>
    </Box>
  );
};

export default RegisterForm;
