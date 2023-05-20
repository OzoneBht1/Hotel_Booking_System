import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

import { useCallback, useState } from "react";
import { CardHeader, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import * as yup from "yup";
import { ICountryData, ISelect, IUserData } from "./types/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const profileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("First name is required"),
  email: yup.string().required("Email is required"),
});

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Others",
    label: "Others",
  },
];

interface IUserProfileProps {
  data: IUserData;
  countries: ISelect[];
  onSubmitForm: (data: any) => void;
}

const allowedFileTypes = ["png", "jpeg", "jpg"];

const UserProfile = ({ data, countries, onSubmitForm }: IUserProfileProps) => {
  console.log(data);
  console.log(countries);
  const [gender, setGender] = useState<ISelect>({
    label: data.gender,
    value: data.gender,
  });
  const [country, setCountry] = useState<ISelect>({
    label: data.country,
    value: data.country,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      country: data.country,
      gender: data.gender,
    },
    resolver: yupResolver(profileSchema),
  });

  const [value, setValue] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [removeImageWasClicked, setRemoveImageWasClicked] = useState(false);

  const handleChange = (newValue: File | null) => {
    setRemoveImageWasClicked(true);
    if (!newValue) return setValue(null);

    if (
      allowedFileTypes.includes(newValue?.type.split("/")[1]) &&
      newValue?.size < 5 * 1024 * 1024
    ) {
      setValue(newValue);
      setError(null);
    } else {
      setError(
        "The image must be a png, jpeg or jpg file with a maximum size of 5MB"
      );
    }
  };

  const onSubmit = (data: any) => {
    if (removeImageWasClicked) {
      onSubmitForm({
        ...data,
        country: country.value,
        gender: gender.value,
        image: value,
      });
    } else {
      onSubmitForm({
        ...data,
        country: country.value,
        gender: gender.value,
      });
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: "300px", maxHeight: "350px" }}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              padding: 3,
            }}
          >
            <Avatar
              src={value ? URL.createObjectURL(value) : data.image}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
              {data.first_name} {data.last_name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {data.country}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <Button fullWidth variant="text">
          <MuiFileInput
            size="small"
            getInputText={(file) =>
              file?.name ? file.name : "No file selected"
            }
            placeholder="Upload your profile picture"
            sx={{
              marginX: -3,

              outline: "none",
              border: "none",
            }}
            value={value}
            onChange={handleChange}
            hideSizeText
          />
        </Button>
      </Card>
      <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    required
                    error={errors.firstName ? true : false}
                    {...register("firstName")}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    helperText="Please specify the last name"
                    label="Last name"
                    error={errors.lastName ? true : false}
                    required
                    {...register("lastName")}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    disabled
                    fullWidth
                    label="Email Address"
                    error={errors.email ? true : false}
                    required
                    {...register("email")}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Autocomplete
                    value={gender}
                    onChange={(e, value) => setGender(value as ISelect)}
                    options={genders}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Gender"
                        // defaultValue={data.country}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Autocomplete
                    value={country}
                    onChange={(e, value) => setCountry(value as ISelect)}
                    options={countries}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        // defaultValue={data.country}
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">
              Save details
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default UserProfile;
