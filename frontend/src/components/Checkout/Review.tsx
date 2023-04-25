import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useAppSelector } from "../../store/hooks";
import { getTotalPrice } from "../../utils/RoomUtils";
import { Box, Button } from "@mui/material";

interface IReview {
  handleNext: () => void;
}

export default function Review({ handleNext }: IReview) {
  const { bookDetail } = useAppSelector((state) => state.tempBook);
  console.log(bookDetail);
  return (
    <>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h6" gutterBottom>
          Rooms summary
        </Typography>

        <Typography variant="body2" gutterBottom>
          Hotel : {bookDetail?.hotel_name}
        </Typography>
        <List disablePadding>
          {bookDetail?.rooms?.map((room) => (
            <ListItem key={room.room_type} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={room.room_type} secondary={room.price} />
              <Typography variant="body2">
                ${room.price} X {room.quantity}
              </Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {bookDetail &&
                bookDetail?.rooms &&
                getTotalPrice(bookDetail?.rooms)}
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
