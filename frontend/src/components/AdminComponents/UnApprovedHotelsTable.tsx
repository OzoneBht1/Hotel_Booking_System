import React, { useState } from "react";
import {
  Alert,
  Backdrop,
  Button,
  Card,
  IconButton,
  Menu,
  Modal,
  Snackbar,
} from "@mui/material";
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
import { Cancel, MoreVert } from "@mui/icons-material";
import { IHotelData, IPaginated } from "../types/types";
import { BASEURL } from "../../store/api/apiSlice";
import {
  useApproveHotelMutation,
  useRejectHotelMutation,
  useSendContractMutation,
} from "../../store/api/hotelSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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

export const UnApprovedHotelsTable = (props: IHotelTableProps) => {
  const { count = 0, items, page = 0, rowsPerPage = 0 } = props;
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showRoomsModal, setShowRoomsModal] = useState(false);
  const [amenitiesData, setAmenitiesData] = useState<string[] | null>(null);
  const [roomsData, setRoomsData] = useState<any[] | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [sendContract, { isLoading }] = useSendContractMutation();
  const [approveHotel] = useApproveHotelMutation();
  const [rejectHotel] = useRejectHotelMutation();
  console.log(items);

  const handleAmenitiesModal = (data: string[]) => {
    setAmenitiesData(data);
    setShowAmenitiesModal((prev) => !prev);
  };

  const handleRoomsModal = (rooms: any) => {
    setShowRoomsModal((prev) => !prev);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.onPageChange(newPage);
  };

  const handleSendContract = (email: string) => {
    sendContract({ email }).then(() => {
      setOpen(true);
      setMessage("Contract Sent to the user!");
    });
  };

  const approveHandler = (hotelId: number) => {
    approveHotel({ hotelId }).then((res) => {
      setOpen(true);
      setMessage(res.data.message);
    });
  };

  const rejectHandler = (hotelId: number) => {
    rejectHotel({ hotelId }).then((res) => {
      setOpen(true);
      setMessage(res.data.message);
    });
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            elevation={6}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Managed By</TableCell>
              <TableCell>Amenities</TableCell>
              <TableCell>Rooms</TableCell>
              <TableCell>Send Contract</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.results?.length === 0 && (
              <Typography margin={3} variant="h6">
                There are currently no hotels left to be approved.
              </Typography>
            )}
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
                        src={
                          hotel.hotel_images &&
                          `${BASEURL}/${hotel.hotel_images[0].image}`
                        }
                      />

                      <Typography variant="subtitle2">{hotel.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{hotel.address}</TableCell>
                  <TableCell>{hotel.manager}</TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleAmenitiesModal(hotel.amenities)}
                      sx={{ fontSize: "12px" }}
                      variant="text"
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      // onClick={() => handleRoomsModal(hotel.cheapest_price)}
                      sx={{ fontSize: "14px" }}
                      variant="text"
                    >
                      {hotel.room_count}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleSendContract(hotel.manager as string)
                      }
                      disabled={isLoading}
                      variant="contained"
                      color="success"
                    >
                      Send
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" gap={3}>
                      <IconButton
                        onClick={() => approveHandler(hotel.id)}
                        color="success"
                      >
                        <CheckCircleIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => rejectHandler(hotel.id)}
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
            {showAmenitiesModal && amenitiesData && (
              <Modal
                open={showAmenitiesModal}
                onClose={() => setShowAmenitiesModal(false)}
              >
                <AmenitiesMenu amenities={amenitiesData} />
              </Modal>
            )}
            {showRoomsModal && roomsData && (
              <Modal
                open={showRoomsModal}
                onClose={() => setShowRoomsModal(false)}
              >
                <RoomsMenu rooms={roomsData} />
              </Modal>
            )}
          </TableBody>
        </Table>
      </Box>

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

export default UnApprovedHotelsTable;

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

interface IAmenitiesMenuProps {
  amenities: string[];
}
export const AmenitiesMenu = ({ amenities }: IAmenitiesMenuProps) => {
  return (
    <Box sx={{ ...style }}>
      {amenities.map((amenity) => (
        <p>{amenity}</p>
      ))}
    </Box>
  );
};

interface IRoomsMenuProps {
  rooms: any[];
}
export const RoomsMenu = ({ rooms }: IRoomsMenuProps) => {
  console.log(rooms);
  return (
    <Box sx={{ ...style }}>
      <p>Hi dad</p>
    </Box>
  );
};
