import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { IHotelRoom, IPaginated } from "../types/types";
import SingleRoom from "./SingleRoom";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTotalPrice, getTotalQuantity } from "../../utils/RoomUtils";
import { roomActions } from "../../store/roomSlice";
import { useState } from "react";
import { useSetBookClickedHistoryMutation } from "../../store/api/bookingSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface IRoomsProps {
  rooms: IPaginated<IHotelRoom> | undefined;
}

const Rooms = ({ rooms }: IRoomsProps) => {
  const theme = useTheme();
  const addedRooms = useAppSelector((state) => state.room.rooms);
  const { user } = useAppSelector((state) => state.auth);
  const nav = useNavigate();
  console.log(addedRooms);
  const dispatch = useAppDispatch();
  const [reset, setReset] = useState(false);

  const { id: hotelId } = useParams();

  const [setTempBooking, { isLoading, isError }] =
    useSetBookClickedHistoryMutation();

  const resetHandler = () => {
    dispatch(roomActions.clearRooms());
    setReset(true);
  };

  const bookClickHandler = () => {
    if (!user) {
      nav("/login");
      return;
    }

    const tempRooms = addedRooms.map((elem) => ({
      room: elem.id,
      quantity: elem.quantity,
    }));

    console.log(user.user_id);
    console.log(hotelId);

    setTempBooking({
      user: user.user_id.toString(),
      hotel: hotelId as string,
      rooms: tempRooms,
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
                align="right"
              >
                Amount Available
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.primary.contrastText }}
                align="right"
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
                        ${getTotalPrice(addedRooms)}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      Rooms :{" "}
                      <Typography fontSize={20}>
                        {getTotalQuantity(addedRooms)}
                      </Typography>
                    </Box>
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
