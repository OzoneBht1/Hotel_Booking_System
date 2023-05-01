import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IHotelRoom } from "../types/types";
import CloseIcon from "@mui/icons-material/Close";
import { listActions } from "../../store/list-slice";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { MuiFileInput } from "mui-file-input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { grey } from "@mui/material/colors";
import PreviewIcon from "@mui/icons-material/Preview";

interface IListPropertiesAmenitiesProps {
  onClickNext: () => void;
}

const roomSchema = yup.object().shape({
  room_type: yup
    .string()
    .matches(/room/i, "Please include the word 'room' in the name")
    .required("Room type is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("This is required")
    .min(1, "The price of room cannot be lower than 0"),
  quantity: yup
    .number()
    .typeError("Number of rooms must be a number")
    .required("This is required")
    .min(1, "There should be atleast one room of the provided type"),
});

const ListPropertiesRoomInfo = ({
  onClickNext,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();

  const rooms = useAppSelector((state) => state?.list?.rooms);

  const [showInitialForm, setShowInitialForm] = useState(true);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const nextClickHandler = () => {
    if (rooms.length === 0) {
      setShowSnackbar(true);
      return;
    }
    onClickNext();
  };

  const addHandler = (roomData: IHotelRoom) => {
    console.log(roomData);
    dispatch(listActions.addRoom({ room: roomData }));
  };
  //
  // useEffect(() => {
  //   if (rooms && rooms.length !== 0) {
  //     setShowInitialForm(false);
  //   }
  // }, [rooms, showInitialForm]);
  return (
    <Container component="main">
      <CssBaseline />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="error"
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please add atleast one room
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: "100%",
          gap: 5,
        }}
      >
        <Typography variant="h4" component="h4">
          Rooms
        </Typography>
        {showInitialForm && (
          <RoomInfo
            showAddButton={rooms.length === 0 ? true : false}
            onClickAdd={addHandler}
            showRemoveButton={rooms.length === 1 ? true : false}
            disabledForm={rooms.length - 1 !== -1 ? true : false}
          />
        )}

        {rooms?.map((_, index) => (
          <RoomInfo
            key={index}
            showAddButton={rooms.length - 1 === index ? true : false}
            showRemoveButton={rooms.length - 2 === index ? true : false}
            disabledForm={rooms.length - 1 !== index ? true : false}
            onClickAdd={addHandler}
          />
        ))}
      </Box>
      <Box
        display="flex"
        width="86%"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Button
          sx={{ width: "20%", mt: 2 }}
          variant="contained"
          onClick={nextClickHandler}
          type="button"
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ListPropertiesRoomInfo;

const allowedFileTypes = ["png", "jpeg", "jpg"];

export const RoomInfo = ({
  onClickAdd,
  showAddButton,
  showRemoveButton,
  disabledForm,
}: {
  onClickAdd: (data: IHotelRoom) => void;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  disabledForm?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHotelRoom>({
    resolver: yupResolver(roomSchema),
  });
  const [value, setValue] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: any) => {
    console.log("Mouse hover");
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (newValue: File | null) => {
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

  if (errors) {
    console.log(errors);
  }
  const dispatch = useAppDispatch();
  const onSubmit = (data: IHotelRoom) => {
    console.log("called");
    onClickAdd(data);
  };

  const removeHandler = () => {
    dispatch(listActions.removeRoom());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap={3} alignItems="center">
        <TextField
          helperText={
            !errors?.room_type
              ? "Ex : Double Room XL"
              : (errors!.room_type!.message as string)
          }
          id="demo-helper-text-misaligned"
          label="Room Type"
          disabled={disabledForm}
          error={errors.room_type ? true : false}
          sx={{
            width: "32%",
          }}
          {...register("room_type")}
        />
        <TextField
          helperText={
            !errors?.price ? "Ex : 1000" : (errors!.price!.message as string)
          }
          id="demo-helper-text-misaligned"
          label="Price"
          disabled={disabledForm}
          type="number"
          error={errors?.price ? true : false}
          sx={{
            width: "32%",
          }}
          {...register("price")}
        />
        <TextField
          helperText={
            !errors?.quantity ? "Ex : 5" : (errors!.quantity.message as string)
          }
          id="demo-helper-text-misaligned"
          label="Number of Rooms"
          type="number"
          disabled={disabledForm}
          error={errors?.quantity ? true : false}
          sx={{
            width: "32%",
          }}
          {...register("quantity")}
        />
        <MuiFileInput
          size="medium"
          aria-owns={anchorEl ? "simple-menu" : undefined}
          getInputText={(file) => (file?.name ? file.name : "No file selected")}
          placeholder="Upload your profile picture"
          value={value}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          hideSizeText
        />
        {error && (
          <Typography color="error" sx={{ margin: 1 }}>
            {error}
          </Typography>
        )}
        {value && (
          // <Box
          //   sx={{
          //     // borderRadius: "50%",
          //     height: "70px",
          //     width: "70px",
          //     display: "flex",
          //     alignItems: "center",
          //     border: `1px solid ${grey[600]}`,
          //   }}
          //   onMouseOver={handleClick}
          // >
          <Box onMouseOver={handleClick}>
            <PreviewIcon
              sx={{
                color: "grey",
                opacity: 0.6,
                height: "40px",
                width: "50px",
              }}
            />
          </Box>
        )}
        {value && (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            <Box paddingX={1}>
              <Typography variant="h6" marginBottom={1}>
                Image Preview
              </Typography>
              <Box
                component="img"
                height="400px"
                width="400px"
                src={value ? URL.createObjectURL(value!) : ""}
              ></Box>
            </Box>
          </Menu>
        )}
        {showRemoveButton ? (
          <Box sx={{ cursor: "pointer" }} padding={0} onClick={removeHandler}>
            <CloseIcon sx={{ color: "purple" }} />
          </Box>
        ) : (
          <Box visibility="hidden">
            <CloseIcon />
          </Box>
        )}
      </Box>
      {showAddButton && (
        <Box display="flex">
          <Button
            type="submit"
            sx={{
              height: "56px",
              marginY: "20px",
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
            variant="outlined"
            color="secondary"
          >
            <AddIcon />
            Add new
          </Button>
        </Box>
      )}
    </form>
  );
};
