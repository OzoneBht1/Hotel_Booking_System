import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { IHotelRoom, IPaginated, ITempRoom } from "../types/types";
import SingleRoom from "./SingleRoom";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getDays,
  getTotalPrice,
  getTotalQuantity,
} from "../../utils/RoomUtils";
import { roomActions } from "../../store/roomSlice";
import { useState } from "react";
import { useSetBookClickedHistoryMutation } from "../../store/api/bookingSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface IRoomsProps {
  rooms: IPaginated<IHotelRoom> | undefined;
}
let stayDuration = 0;
const Rooms = ({ rooms }: IRoomsProps) => {
  const theme = useTheme();
  const addedRooms = useAppSelector((state) => state.room.rooms);
  const { user } = useAppSelector((state) => state.auth);
  const nav = useNavigate();
  console.log(addedRooms);
  const dispatch = useAppDispatch();
  const [reset, setReset] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<Date | null>(
    null
  );

  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<Date | null>(
    null
  );
  if (selectedCheckInDate && selectedCheckOutDate) {
    stayDuration = getDays(selectedCheckInDate, selectedCheckOutDate);
  }

  const [error, setError] = useState<null | string>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { id: hotelId } = useParams();

  const [setTempBooking] = useSetBookClickedHistoryMutation();

  const resetHandler = () => {
    dispatch(roomActions.clearRooms());
    setReset(true);
  };

  const bookClickHandler = () => {
    if (!user) {
      nav("/login");
      return;
    }

    if (!selectedCheckInDate || !selectedCheckOutDate) {
      setError("Please select check-in and check-out dates");
      return;
    }

    const checkInISO = selectedCheckInDate.toISOString();
    const checkOutISO = selectedCheckOutDate.toISOString();

    const checkInDate = checkInISO.split("T")[0];
    const checkOutDate = checkOutISO.split("T")[0];

    const dateFormatCheckIn = new Date(checkInISO);
    const dateFormatCheckOut = new Date(checkOutISO);

    if (dateFormatCheckIn > dateFormatCheckOut) {
      setOpenSnackbar(true);
      setError("Check out date must be greater than check in date");
      return;
    }

    const tempRooms: ITempRoom[] = addedRooms.map((elem) => ({
      room: elem.id as number,
      quantity: elem.quantity,
    }));

    setTempBooking({
      user: user.user_id.toString(),
      hotel: hotelId as string,
      rooms: tempRooms,
      hotel_name: "",
      check_in: checkInDate,
      check_out: checkOutDate,
    })
      .unwrap()
      .then(() => {
        nav(`/hotel/${hotelId}/${user.user_id}/payment`);
      })
      .catch(() => {
        nav("/error");
      });
  };

  return (
    <>
      <Typography component="h4" variant="h5">
        Rooms
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <TableRow>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                Room Type
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.primary.contrastText }}
                align="center"
              >
                Amount Available
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.primary.contrastText }}
                align="center"
              >
                Price Per Room
              </TableCell>

              <TableCell
                sx={{ color: theme.palette.primary.contrastText }}
                align="center"
              >
                Select Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms &&
              rooms?.results?.map((room, index) => (
                <SingleRoom
                  key={index}
                  room={room}
                  reset={reset}
                  setReset={setReset}
                />
              ))}
            {addedRooms.length > 0 && (
              <TableCell colSpan={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingRight={8}
                >
                  <Box display="flex" alignItems="center" gap={3}>
                    <Box display="flex" alignItems="center" gap={1}>
                      Subtotal :{" "}
                      <Typography fontSize={20}>
                        ${getTotalPrice(addedRooms, stayDuration)}
                      </Typography>
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {/* <Box
            sx={{
              // display: { xs: "flex", md: "block" },
              width: "100%",

              flexWrap: "nowrap",
            }}
          > */}
                      <DatePicker
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            sx={{
                              marginRight: 0.5,
                              width: { xs: "48%", md: "30%" },
                              flexShrink: 1,
                            }}
                          />
                        )}
                        label="Check-in date"
                        value={selectedCheckInDate}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setSelectedCheckInDate(newValue);
                        }}
                      />
                      <DatePicker
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            sx={{
                              width: { xs: "45%", sm: "48%", md: "30%" },
                              flexShrink: 1,
                            }}
                          />
                        )}
                        label="Check-out date"
                        value={selectedCheckOutDate}
                        onChange={(newValue) => {
                          setSelectedCheckOutDate(newValue);
                        }}
                      />
                      {/* </Box> */}
                    </LocalizationProvider>

                    <Box display="flex" alignItems="center" gap={1}>
                      Rooms :{" "}
                      <Typography fontSize={20}>
                        {getTotalQuantity(addedRooms)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    Duration :
                    <Typography fontSize={20}>
                      {stayDuration > 0 ? stayDuration : 0} days
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Button
                      onClick={resetHandler}
                      color="error"
                      variant="outlined"
                    >
                      {" "}
                      Reset{" "}
                    </Button>
                    <Button onClick={bookClickHandler} variant="contained">
                      {" "}
                      Book{" "}
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Rooms;
