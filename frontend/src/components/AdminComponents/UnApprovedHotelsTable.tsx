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
import { useSendContractMutation } from "../../store/api/hotelSlice";

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
  const [sendContract, { isLoading, isError }] = useSendContractMutation();
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
    console.log("hi");
    sendContract({ email });
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Managed By</TableCell>
              <TableCell>Amenities</TableCell>
              <TableCell>Rooms</TableCell>
              <TableCell>Send Contract</TableCell>
              <TableCell>Actions</TableCell>
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
                      onClick={() => handleSendContract(hotel.manager)}
                      color="success"
                    >
                      Send
                    </Button>
                  </TableCell>
                  <TableCell>
                    <MoreVert />
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
            {showRoomsModal && (
              <Modal
                open={showRoomsModal}
                onClose={() => setShowRoomsModal(false)}
              >
                <RoomsMenu />
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

export const RoomsMenu = () => {
  return (
    <Box sx={{ ...style }}>
      <p>Hi dad</p>
    </Box>
  );
};
