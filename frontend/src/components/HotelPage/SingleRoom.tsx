import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { IHotelRoom } from "../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SelectChangeEvent } from "@mui/material/Select";
import { roomActions } from "../../store/roomSlice";

interface ISingleRoom {
  room: IHotelRoom;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleRoom = ({ room, reset, setReset }: ISingleRoom) => {
  const [roomQuantity, setRoomQuantity] = useState("0");

  const rooms = useAppSelector((state) => state.room.rooms);
  console.log(rooms);
  const dispatch = useAppDispatch();

  const handleRoomChange = (event: SelectChangeEvent) => {
    setRoomQuantity(event!.target!.value);
    const quantity = parseInt(event!.target!.value);
    dispatch(roomActions.modifyRooms({ room: { ...room, quantity } }));
  };

  const handleReset = () => {
    setRoomQuantity("0");
    setReset(false);
  };

  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Box display="flex" flexDirection={"column"} gap={1}>
          <Typography
            component="span"
            variant="h6"
            fontSize={14}
            fontWeight="700px"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            {room.room_type}
          </Typography>
          <Typography component="span" variant="caption">
            {"1 bed"}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">{room.amount}</TableCell>
      <TableCell align="right">${room.price}</TableCell>
      <TableCell align="center">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={roomQuantity.toString()}
            label="Quantity"
            autoWidth
            onChange={handleRoomChange}
          >
            {[...Array(room.amount + 1).keys()].map((quantity) => (
              <MenuItem key={quantity} value={quantity}>
                {quantity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default SingleRoom;
