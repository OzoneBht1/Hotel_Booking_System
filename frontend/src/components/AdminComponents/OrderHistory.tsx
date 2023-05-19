import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { IBookingCreate } from "../types/types";
import { getDate, getDays, getTotalPrice } from "../../utils/RoomUtils";

interface IOrderHistoryProps {
  data: IBookingCreate[];
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders({ data }: IOrderHistoryProps) {
  console.log(data);
  return (
    <React.Fragment>
      <Typography>Recent Orders</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Hotel</TableCell>
            <TableCell>Paid By</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{getDate(order.created_at as string)}</TableCell>
              <TableCell>{order.hotel_name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.user_name}</TableCell>
              <TableCell>{order.check_in}</TableCell>
              <TableCell>{order.check_out}</TableCell>
              <TableCell align="right">{`$${getTotalPrice(
                order.rooms as any,
                getDays(order.check_in, order.check_out)
              )}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
