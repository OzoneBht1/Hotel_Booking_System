import { PlusOneSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRoom } from "../types/types";
import CloseIcon from "@mui/icons-material/Close";
import { listActions } from "../../store/list-slice";
interface IListPropertiesAmenitiesProps {
  onClickNext: () => void;
}

const roomSchema = yup.object().shape({
  roomType: yup
    .string()
    .matches(/room/i, "Please include the word 'room' in the name")
    .required("Room type is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("This is required")
    .min(1, "The price of room cannot be lower than 0"),
  numberOfRooms: yup
    .number()
    .typeError("Number of rooms must be a number")
    .required("This is required")
    .min(1, "There should be atleast one room of the provided type"),
});

const ListPropertiesRoomInfo = ({
  onClickNext,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();
  const [rooms, setRooms] = useState<IRoom[]>([
    { roomType: "", price: 0, numberOfRooms: 0 },
  ]);
  console.log(rooms);
  const nextClickHandler = () => {
    onClickNext();
  };

  const addHandler = (roomData: IRoom) => {
    console.log("addhandler");
    setRooms((rooms) => [...rooms, roomData]);
    dispatch(listActions.addAmenity(roomData))
  };
  return (
    <Container component="main">
      <CssBaseline />
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
        {rooms.map((room, index) => (
          <RoomInfo
            key={index}
            showAddButton={rooms.length - 1 === index ? true : false}
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

export const RoomInfo = ({
  onClickAdd,
  showAddButton,
  disabledForm,
}: {
  onClickAdd: (data: IRoom) => void;
  showAddButton: boolean;
  disabledForm: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRoom>({
    resolver: yupResolver(roomSchema),
  });
  const onSubmit = (data: IRoom) => {
    onClickAdd(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap={3} alignItems="center">
        <TextField
          helperText={
            !errors?.roomType
              ? "Ex : Double Room XL"
              : (errors!.roomType!.message as string)
          }
          id="demo-helper-text-misaligned"
          label="Room Type"
          disabled={disabledForm}
          error={errors.roomType ? true : false}
          sx={{
            width: "32%",
          }}
          {...register("roomType")}
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
            !errors?.numberOfRooms
              ? "Ex : 5"
              : (errors!.numberOfRooms!.message as string)
          }
          id="demo-helper-text-misaligned"
          label="Number of Rooms"
          type="number"
          disabled={disabledForm}
          error={errors?.numberOfRooms ? true : false}
          sx={{
            width: "32%",
          }}
          {...register("numberOfRooms")}
        />
        {disabledForm ? (
          <Box padding={0}>
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
