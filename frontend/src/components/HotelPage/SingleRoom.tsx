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
import { useAppDispatch } from "../../store/hooks";
import { SelectChangeEvent } from "@mui/material/Select";
import { roomActions } from "../../store/roomSlice";
import { useGetNextAvailableDateQuery } from "../../store/api/review-slice";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
interface ISingleRoom {
  room: IHotelRoom;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleRoom = ({ room, reset, setReset }: ISingleRoom) => {
  const [roomQuantity, setRoomQuantity] = useState("0");
  console.log(room);
  const { data: availability, isLoading: availabilityIsLoading } =
    useGetNextAvailableDateQuery(
      { roomId: room.id?.toString()! },
      {
        skip: !room.id,
      }
    );

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
            <Box
              height="200px"
              width="300px"
              component="img"
              src={room.image as string}
            />
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box>
          {room.quantity}
          {availability?.earliest && (
            <Tooltip
              title={`More rooms will be available from ${availability.earliest}`}
            >
              <IconButton>
                <InfoIcon color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">${room.price}</TableCell>
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
            {[...Array(room.quantity + 1).keys()].map((quantity) => (
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
