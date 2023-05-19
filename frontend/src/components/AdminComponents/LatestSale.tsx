import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useGetLatestBookingQuery } from "../../store/api/bookingSlice";
import { getDateTime, getDays, getTotalPrice } from "../../utils/RoomUtils";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

let amount = 0;
export default function Deposits() {
  const {
    data: latestBooking,
    isLoading: latestBookingIsLoading,
    isError: latestBookingIsError,
  } = useGetLatestBookingQuery(null);

  if (latestBooking) {
    let stayDuration = getDays(latestBooking.check_in, latestBooking.check_out);
    console.log(stayDuration);
    amount = getTotalPrice(latestBooking.rooms as any, stayDuration);
  }

  if (latestBookingIsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Typography>Recent Deposit</Typography>
      <Typography component="p" variant="h4">
        ${amount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, marginY: 1 }}>
        on {getDateTime(latestBooking?.created_at)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        for {latestBooking?.hotel_name}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
