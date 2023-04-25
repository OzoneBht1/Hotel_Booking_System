import {
  Box,
  Button,
  Container,
  CssBaseline,
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
  amount: yup
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

  console.log(rooms);

  const nextClickHandler = () => {
    onClickNext();
  };

  const addHandler = (roomData: IHotelRoom) => {
    console.log(roomData);
    dispatch(listActions.addRoom({ room: roomData }));
  };

  useEffect(() => {
    if (rooms && rooms.length !== 0) {
      setShowInitialForm(false);
    }
  }, [rooms, showInitialForm]);
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
        {rooms?.map((_, index) => (
          <RoomInfo
            key={index}
            showAddButton={rooms.length - 1 === index ? true : false}
            showRemoveButton={rooms.length - 2 === index ? true : false}
            disabledForm={rooms.length - 1 !== index ? true : false}
            onClickAdd={addHandler}
          />
        ))}
        {showInitialForm && (
          <RoomInfo showAddButton={true} onClickAdd={addHandler} />
        )}
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
            !errors?.amount ? "Ex : 5" : (errors!.amount.message as string)
          }
          id="demo-helper-text-misaligned"
          label="Number of Rooms"
          type="number"
          disabled={disabledForm}
          error={errors?.amount ? true : false}
          sx={{
            width: "32%",
          }}
          {...register("amount")}
        />
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
