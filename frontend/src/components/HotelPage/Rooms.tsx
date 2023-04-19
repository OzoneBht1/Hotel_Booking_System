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

interface IRoomsProps {
  rooms: IPaginated<IHotelRoom> | undefined;
}

const Rooms = ({ rooms }: IRoomsProps) => {
  const theme = useTheme();
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
                <SingleRoom key={index} room={room} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Rooms;
