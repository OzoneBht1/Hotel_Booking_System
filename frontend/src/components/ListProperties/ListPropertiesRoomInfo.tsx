import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
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
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { MuiFileInput } from "mui-file-input";
import PreviewIcon from "@mui/icons-material/Preview";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IListPropertiesAmenitiesProps {
  onClickNext: (images: File[]) => void;
  onClickPrev: (images: File[]) => void;
  defaultImgs: File[] | null;
}

const roomSchema = yup.object().shape({
  room_type: yup
    .string()
    .matches(/room/i, "Include the term 'room'")
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

let isInitial = true;
let showInitialForm = true;
const ListPropertiesRoomInfo = ({
  onClickNext,
  onClickPrev,
  defaultImgs,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>(defaultImgs ? defaultImgs : []);
  const { rooms } = useAppSelector((state) => state?.list);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    isInitial = false;
    setOpen(false);
  };
  const [showSnackbar, setShowSnackbar] = useState(false);

  const nextClickHandler = () => {
    if (rooms.length === 0) {
      setShowSnackbar(true);
      return;
    }
    if (isInitial) {
      handleClickOpen();
      return;
    }

    onClickNext(files);
  };

  const addHandler = (
    roomData: Omit<IHotelRoom, "image"> & { image?: File }
  ) => {
    const image = roomData.image;
    if (image) {
      setFiles((prev) => [...prev, image]);
    }
    delete roomData.image;
    dispatch(listActions.addRoom({ room: roomData as IHotelRoom }));
  };

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
            defaultValues={rooms[0]}
            defaultImage={defaultImgs ? defaultImgs[0] : undefined}
            showRemoveButton={rooms.length === 1 ? true : false}
            disabledForm={rooms.length - 1 !== -1 ? true : false}
            setFiles={setFiles}
          />
        )}
        {rooms?.length > 0 &&
          rooms?.map((room, index) => (
            <RoomInfo
              key={index}
              showAddButton={rooms.length - 1 === index ? true : false}
              showRemoveButton={rooms.length - 2 === index ? true : false}
              defaultValues={rooms.length - 1 !== index ? room : undefined}
              defaultImage={
                defaultImgs && defaultImgs.length - 1 !== index
                  ? defaultImgs[index]
                  : undefined
              }
              disabledForm={rooms.length - 1 !== index ? true : false}
              onClickAdd={addHandler}
              setFiles={setFiles}
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
          sx={{ width: "20%", marginRight: "auto" }}
          color="secondary"
          variant="outlined"
          onClick={() => onClickPrev(files)}
        >
          Previous
        </Button>
        <Button
          sx={{ width: "20%", mt: 2 }}
          variant="contained"
          onClick={nextClickHandler}
          type="button"
        >
          Create Listing
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to create a new listing. Please review all of the
              information provided before proceeding further.
            </DialogContentText>
            <DialogContentText>
              Click the button again to proceed
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
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
  defaultValues,
  defaultImage,
  setFiles,
}: {
  onClickAdd: (data: any) => void;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  defaultValues?: IHotelRoom;
  defaultImage?: File;
  disabledForm?: boolean;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHotelRoom>({
    resolver: yupResolver(roomSchema),
  });
  const [value, setValue] = useState<File | null>(
    defaultImage ? defaultImage : null
  );
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: any) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (newValue: File | null) => {
    if (!newValue) return setValue(null);
    setError(null);

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

  const dispatch = useAppDispatch();
  const onSubmit = (data: IHotelRoom) => {
    if (!value) {
      setError("Room image is required");
      return;
    }
    onClickAdd({ ...data, image: value });
  };

  const removeHandler = () => {
    dispatch(listActions.removeRoom());
    setFiles((prev) => prev.slice(0, prev.length - 1));
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
          defaultValue={defaultValues?.room_type || ""}
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
          defaultValue={defaultValues?.price || ""}
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
          defaultValue={defaultValues?.quantity || ""}
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
          disabled={disabledForm}
          onChange={handleChange}
          error={!!error && true}
          helperText={!!error ? error : "The room image"}
          hideSizeText
        />

        {value && (
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
        {!value && <Box visibility="hidden" width="80px"></Box>}
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
