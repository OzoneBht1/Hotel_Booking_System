import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useAppSelector } from "../../store/hooks";
import { getTotalPrice } from "../../utils/RoomUtils";
import { Avatar, Box, Button, ListItemAvatar } from "@mui/material";
import { getDays } from "../../utils/RoomUtils";

interface IReview {
  handleNext: () => void;
}
let stayDuration = 0;
export default function Review({ handleNext }: IReview) {
  const { bookDetail } = useAppSelector((state) => state.tempBook);

  if (bookDetail) {
    stayDuration = getDays(bookDetail.check_in, bookDetail.check_out);
    console.log(stayDuration);
  }
  console.log(bookDetail);
  return (
    <>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h6" gutterBottom>
          Rooms summary
        </Typography>

        <Typography variant="h6" fontSize={17} gutterBottom>
          Hotel : {bookDetail?.hotel_name}
        </Typography>
        <Typography variant="h6" fontSize={16} gutterBottom>
          Stay Duration : {stayDuration} Days
        </Typography>

        <List disablePadding>
          {bookDetail?.rooms?.map((room) => (
            <ListItem key={room.room_type} sx={{ py: 1, px: 0 }}>
              <ListItemAvatar>
                <Box
                  component="img"
                  sx={{ borderRadius: "none", width: "50px", height: "50px" }}
                  alt={room.room_type}
                  src={room.image}
                />
              </ListItemAvatar>

              <ListItemText primary={room.room_type} />

              <Typography variant="body2">
                ${room.price} X {room.quantity}
              </Typography>
            </ListItem>
          ))}

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />

            <Typography
              variant="subtitle1"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              ${" "}
              {bookDetail &&
                bookDetail?.rooms &&
                getTotalPrice(bookDetail?.rooms, stayDuration)}
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Box display="flex" width="100%" justifyContent="flex-end">
        <Button onClick={handleNext} variant="contained" sx={{ mt: 3, ml: 1 }}>
          Proceed
        </Button>
      </Box>
    </>
  );
}
