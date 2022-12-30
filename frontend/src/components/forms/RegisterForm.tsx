import React, { useCallback, useEffect, useState } from "react";
import useInput from "../../hooks/use-input";
import { getCountries } from "../api/getCountries";
import { countryInformation } from "../types/types";
import {
  Alert,
  Autocomplete,
  Box,
  createFilterOptions,
  Snackbar,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Typography from "@mui/material/Typography";
import useSelect from "../../hooks/use-select";
import { useAppDispatch } from "../../store/hooks";
import { RegistrationInformation } from "../types/types";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";

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
let defGender: { value: string; label: string } | null = null;
let defCountry: { value: string; label: string } | null = null;

interface RegisterFormProps {
  onReceiveData: (data: RegistrationInformation) => void;
  data: RegistrationInformation | null;
}

const RegisterForm = ({ onReceiveData, data }: RegisterFormProps) => {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const {
    selectedValue: selectedCountry,
    setSelectedValue: setSelectedCountry,
    valueChangeHandler: selectedCountryChangeHandler,
    inputBlurHandler: selectedCountryBlurHandler,
    hasError: selectedCountryHasError,
    defaultValueReceive: countryDefaultValueReceived,
  } = useSelect();
  const {
    selectedValue: selectedGender,
    setSelectedValue: setSelectedGender,
    valueChangeHandler: selectedGenderChangeHandler,
    inputBlurHandler: selectedGenderBlurHandler,
    hasError: selectedGenderHasError,
    defaultValueReceive: genderDefaultValueReceived,
  } = useSelect();

  const {
    value: lastNameValue,
    setValue: setLastNameValue,
    hasError: lastNameInputHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: firstNameValue,
    setValue: setFirstNameValue,
    hasError: firstNameInputHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim().length > 0);

  console.log(firstNameValue);

  const {
    value: emailValue,
    setValue: setEmailValue,
    hasError: emailInputHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: passwordValue,
    setValue: setPasswordValue,
    hasError: passwordInputHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length > 6);
  const {
    value: password2Value,
    setValue: setPassword2Value,
    hasError: password2InputHasError,
    isValid: password2IsValid,
    valueChangeHandler: password2ChangedHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2Input,
  } = useInput((value) => value.trim().length > 6);

  const fetchCountries = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (data) {
      setFirstNameValue(data.first_name);
      setLastNameValue(data.last_name);
      setEmailValue(data.email);
      genderDefaultValueReceived({ value: data.gender, label: data.gender });
      countryDefaultValueReceived({ value: data.country, label: data.country });
      // selectedGenderChangeHandler({ value: data.gender, label: data})

      setPasswordValue(data.password);
      setPassword2Value(data.password2);
    }
  }, [data]);

  let formIsValid: boolean = true;

  console.log(selectedCountry?.value, selectedGender?.value);

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
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (passwordValue !== password2Value) {
      console.log("NOT SAME PASSWORD");
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
        country: selectedCountry!.value,
        gender: selectedGender!.value,
      });
    }
  };

  const OPTIONS_LIMIT = 7;

  return (
    <Box>
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
          sx={{
            marginBottom: "-1rem",
          }}
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
      {/* add margin top and bottom to the select below */}
      <Box
        marginTop={1.5}
        marginBottom={selectedGenderHasError ? "0.1px" : "1.5rem"}
      >
        <Autocomplete
          disablePortal
          id="combo-box-gender"
          options={GENDERS}
          value={selectedGender || null}
          autoComplete={true}
          autoHighlight={true}
          isOptionEqualToValue={(selectedValue, optionValue) => {
            return selectedValue.value === optionValue.value;
          }}
          onBlur={selectedGenderBlurHandler}
          onChange={selectedGenderChangeHandler}
          // sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select your gender*" />
          )}
        />
      </Box>
      {selectedGenderHasError && (
        <Typography
          color="error"
          fontSize={12}
          marginBottom={1.5}
          marginLeft={1.5}
        >
          Please select your gender
        </Typography>
      )}
      <Box
        marginTop={1.5}
        marginBottom={selectedGenderHasError ? "0.1px" : "0.5rem"}
      >
        <Autocomplete
          disablePortal
          id="combo-box-country"
          fullWidth={true}
          options={countries}
          value={selectedCountry || null}
          autoComplete={true}
          isOptionEqualToValue={(selectedValue, optionValue) => {
            return selectedValue.value === optionValue.value;
          }}
          autoHighlight={true}
          onChange={selectedCountryChangeHandler}
          onBlur={selectedCountryBlurHandler}
          // filterOptions={filterOptions}

          // sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select your country*" />
          )}
        />
        {selectedCountryHasError && (
          <Typography
            color="error"
            fontSize={12}
            marginBottom={1}
            marginLeft={1.5}
          >
            Please select your country
          </Typography>
        )}
      </Box>
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
      <Button
        // loading={isLoading}
        onClick={submitHandler}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 3 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default RegisterForm;
