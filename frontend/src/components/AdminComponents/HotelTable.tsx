import React, { useState } from "react";
import { Backdrop, Button, Card, Menu, Modal } from "@mui/material";
import {
  Avatar,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { IHotelData, IPaginated } from "../types/types";
import { BASEURL } from "../../store/api/apiSlice";

interface IHotelTableProps {
  count?: number;
  items: IPaginated<IHotelData>;
  onPageChange: (page: number) => void;
  page?: number;
  rowsPerPage?: number;
  loading?: boolean;
  // selected?: any[];
  //
}

export const HotelTable = (props: IHotelTableProps) => {
  const { count = 0, items, page = 0, rowsPerPage = 0 } = props;
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showRoomsModal, setShowRoomsModal] = useState(false);

  const handleAmenitiesModal = () => {
    setShowAmenitiesModal((prev) => !prev);
  };

  const handleRoomsModal = () => {
    setShowRoomsModal((prev) => !prev);
  };
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.onPageChange(newPage);
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Amenities</TableCell>
              <TableCell>Rooms</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.results?.map((hotel) => {
              return (
                <TableRow hover key={hotel.id}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Box
                        component="img"
                        height="60px"
                        width="60px"
                        loading="lazy"
                        // src={
                        //   hotel.hotel_images &&
                        //   `${BASEURL}/${hotel.hotel_images[0].image}`
                        // }
                      />

                      <Typography variant="subtitle2">{hotel.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{hotel.address}</TableCell>
                  <TableCell>{hotel.hotel_score}</TableCell>
                  <TableCell>
                    <Button
                      onClick={handleAmenitiesModal}
                      sx={{ fontSize: "12px" }}
                      variant="text"
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={handleRoomsModal}
                      sx={{ fontSize: "14px" }}
                      variant="text"
                    >
                      {hotel.room_count}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <MoreVert />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {showAmenitiesModal && (
        <Modal
          open={showAmenitiesModal}
          onClose={() => setShowAmenitiesModal(false)}
        >
          <AmenitiesMenu />
        </Modal>
      )}
      {showRoomsModal && (
        <Modal open={showRoomsModal} onClose={() => setShowRoomsModal(false)}>
          <RoomsMenu />
        </Modal>
      )}

      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        page={page}
        backIconButtonProps={
          props.loading
            ? {
                disabled: props.loading,
              }
            : undefined
        }
        nextIconButtonProps={
          props.loading
            ? {
                disabled: props.loading,
              }
            : undefined
        }
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
};

export default HotelTable;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const AmenitiesMenu = () => {
  return (
    <Box sx={{ ...style }}>
      <p>Hi mom</p>
    </Box>
  );
};
export const RoomsMenu = () => {
  return (
    <Box sx={{ ...style }}>
      <p>Hi dad</p>
    </Box>
  );
};
