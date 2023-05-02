import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { listActions } from "../../store/list-slice";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import defaultHotelImage from "../../assets/default-hotel-image.jpg";
import { grey } from "@mui/material/colors";
import { MuiFileInput } from "mui-file-input";

interface IListPropertiesAmenitiesProps {
  onClickNext: (image: File) => void;
  onClickPrev: () => void;
  defaultImg: File | null;
}

const nameAddressSchema = yup.object().shape({
  hotelName: yup.string().required("Name is Required"),
  hotelAddress: yup.string().required("This is required"),
});

const allowedFileTypes = ["png", "jpeg", "jpg"];
const ListPropertiesNameAmenities = ({
  onClickNext,
  onClickPrev,
  defaultImg,
}: IListPropertiesAmenitiesProps) => {
  console.log(defaultImg);
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ hotelName: string; hotelAddress: string }>({
    resolver: yupResolver(nameAddressSchema),
  });

  const [image, setImage] = useState<File | null>(
    defaultImg ? defaultImg : null
  );

  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (newValue: File | null) => {
    if (!newValue) return setImage(null);

    if (
      allowedFileTypes.includes(newValue?.type.split("/")[1]) &&
      newValue?.size < 5 * 1024 * 1024
    ) {
      setImage(newValue);
      setError(null);
    } else {
      setError(
        "The image must be a png, jpeg or jpg file with a maximum size of 5MB"
      );
    }
  };

  const onSubmit: SubmitHandler<{ hotelName: string; hotelAddress: string }> = (
    data
  ) => {
    console.log(data);

    if (!image) {
      setError("An image is required");
      return;
    }

    dispatch(
      listActions.setHotelNameAndAddress({
        hotel_name: data.hotelName,
        hotel_address: data.hotelAddress,
      })
    );
    onClickNext(image);
  };

  return (
    <Container component="main">
      {!!error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            elevation={6}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
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
        <Box display="flex" flexDirection="column" gap={5} width="60%">
          <TextField
            required
            id="outlined-required"
            label="Hotel Name"
            variant="standard"
            fullWidth
            value={list.hotel_name}
            // helperText={errors?.hotelName ? errors!.hotelName!.message : ""}

            error={errors?.hotelName ? true : false}
            {...register("hotelName")}
          />

          <TextField
            required
            id="outlined-required"
            variant="standard"
            value={list.hotel_address}
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

        <Box width="100%" gap={2} display="flex" flexDirection="column">
          <Box
            component="img"
            sx={{
              width: "60%",
              height: "450px",
              border: `1px solid ${grey[400]}`,
            }}
            src={image ? URL.createObjectURL(image!) : defaultHotelImage}
          ></Box>
          <MuiFileInput
            size="small"
            getInputText={(file) =>
              file?.name ? file.name : "No file selected"
            }
            placeholder="Upload your profile picture"
            value={image}
            sx={{ width: "60%" }}
            onChange={handleFileChange}
            hideSizeText
          />
        </Box>

        <Box
          display="flex"
          width="60%"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Button
            sx={{ width: "20%", marginRight: "auto" }}
            color="secondary"
            variant="outlined"
            onClick={() => onClickPrev()}
          >
            Previous
          </Button>
          <Button sx={{ width: "20%" }} variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ListPropertiesNameAmenities;
