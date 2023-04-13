import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Grid,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { styled } from "@mui/material/styles";
import { amenitiesMap } from "../icons/Icons";
import { listActions } from "../../store/list-slice";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IListPropertiesAmenitiesProps {
  onClickNext: () => void;
}

const nameAddressSchema = yup.object().shape({
  hotelName: yup.string().required("Name is Required"),
  hotelAddress: yup.string().required("This is required"),
});

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  gap: 1,
  color: theme.palette.text.secondary,
}));

const ListPropertiesNameAmenities = ({
  onClickNext,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ hotelName: string; hotelAddress: string }>({
    resolver: yupResolver(nameAddressSchema),
  });

  const onSubmit: SubmitHandler<{ hotelName: string; hotelAddress: string }> = (
    data
  ) => {
    console.log(data);
    dispatch(
      listActions.setHotelNameAndAddress({
        hotel_name: data.hotelName,
        hotel_address: data.hotelAddress,
      })
    );
    onClickNext();
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(
        listActions.addAmenity({
          amenity: e.target.value,
        })
      );
    } else {
      dispatch(
        listActions.removeAmenity({
          amenity: e.target.value,
        })
      );
    }
  };
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",

          alignItems: "left",
          width: "100%",
          gap: 5,
        }}
      >
        <Box display="flex" flexDirection="row" gap={5} width="100%">
          <TextField
            required
            id="outlined-required"
            label="Hotel Name"
            fullWidth
            // helperText={errors?.hotelName ? errors!.hotelName!.message : ""}

            error={errors?.hotelName ? true : false}
            {...register("hotelName")}
          />

          <TextField
            required
            id="outlined-required"
            helperText={
              errors?.hotelAddress
                ? (errors?.hotelAddress?.message as string)
                : ""
            }
            error={errors?.hotelAddress ? true : false}
            multiline
            fullWidth
            label="Hotel Address"
            {...register("hotelAddress")}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" component="h4">
            Accessibility Features
          </Typography>
          <Typography variant="body2">Select all that apply*</Typography>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Object.keys(amenitiesMap).map((amenity) => {
            const amenityObj = amenitiesMap[amenity];
            if (amenityObj.category === "Accessibility") {
              return (
                <Grid item xs={6} key={amenity}>
                  <Box display="flex" alignItems="center">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleAmenitiesChange}
                            value={amenity}
                            // name={amenity}
                          />
                        }
                        label={
                          <Item>
                            {amenityObj.icon}
                            {amenity}
                          </Item>
                        }
                      />
                    </FormGroup>
                  </Box>
                </Grid>
              );
            }
          })}
        </Grid>
        <Box
          display="flex"
          width="70%"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Button sx={{ width: "20%" }} variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ListPropertiesNameAmenities;
