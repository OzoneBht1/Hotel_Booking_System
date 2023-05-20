import React, { useState } from "react";
import {
  Alert,
  Backdrop,
  Button,
  Card,
  IconButton,
  Menu,
  Modal,
  Paper,
  Snackbar,
  Tooltip,
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
import { MoreVert } from "@mui/icons-material";
import { IHotelData, IPaginated } from "../types/types";
import { BASEURL } from "../../store/api/apiSlice";
import { amenitiesMap } from "../icons/Icons";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useUpdateAmenitiesMutation } from "../../store/api/hotelSlice";

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
  const [amenitiesData, setAmenitiesData] = useState<string[] | null>(null);
  const [hotelId, setHotelId] = useState<null | number>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");

  const handleAmenitiesModal = (data: string[], id: number) => {
    setAmenitiesData(data);
    setHotelId(id);
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

  const postUpdateHandler = () => {
    setAmenitiesData(null);
    setHotelId(null);
    setShowAmenitiesModal(false);
    setShowSnackbar(true);
    setMessage("Amenities Updated Successfully");
    setSeverity("success");
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity={severity}
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
                        src={
                          hotel.hotel_images &&
                          `${BASEURL}/${hotel.hotel_images[0].image}`
                        }
                      />

                      <Typography variant="subtitle2">{hotel.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{hotel.address}</TableCell>
                  <TableCell>{hotel.hotel_score}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleAmenitiesModal(hotel.amenities, hotel.id)
                      }
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
                    <MoreVert />
                  </TableCell>
                </TableRow>
              );
            })}
            {showAmenitiesModal && hotelId && amenitiesData && (
              <Modal
                open={showAmenitiesModal}
                onClose={() => setShowAmenitiesModal(false)}
              >
                <AmenitiesMenu
                  onUpdate={postUpdateHandler}
                  hotelId={hotelId}
                  amenities={amenitiesData}
                />
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

export default HotelTable;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 485,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface IAmenitiesMenuProps {
  amenities: string[];
  hotelId: number;
  onUpdate: () => void;
}
export const AmenitiesMenu = ({
  amenities,
  hotelId,
  onUpdate,
}: IAmenitiesMenuProps) => {
  const [hotelAmenities, setHotelAmenities] = useState<string[]>(amenities);
  const amenityNames = Object.keys(amenitiesMap);
  const [updateAmenities] = useUpdateAmenitiesMutation();
  const filteredAmenities = amenityNames.filter((amenity) => {
    return !hotelAmenities.includes(amenity);
  });
  console.log(amenities);

  const amenitiesAddHandler = (amenity: string) => {
    setHotelAmenities((prev) => [...prev, amenity]);
  };

  const amenitiesRemoveHandler = (amenity: string) => {
    setHotelAmenities((prev) => prev.filter((item) => item !== amenity));
  };

  const amenitiesUpdateHandler = () => {
    updateAmenities({ hotelId, amenities }).then(() => onUpdate());
  };

  return (
    <Box sx={{ ...style }}>
      <Stack direction="row" width="100%">
        <Stack width="50%">
          <Typography margin={2} variant="h6">
            All Amenities
          </Typography>
          <Paper style={{ maxHeight: 325, padding: 10, overflow: "auto" }}>
            {filteredAmenities.map((amenity) => (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{amenity}</Typography>

                <Tooltip title="Remove">
                  <IconButton>
                    <AddIcon onClick={() => amenitiesAddHandler(amenity)} />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Paper>
        </Stack>
        <Stack borderLeft={1} width="50%">
          <Typography margin={2} variant="h6">
            Selected Amenities
          </Typography>
          <Paper
            style={{
              maxHeight: 325,
              padding: 10,
              overflow: "auto",
            }}
          >
            {hotelAmenities.map((amenity) => (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{amenity}</Typography>
                <Tooltip title="Remove">
                  <IconButton>
                    <RemoveIcon
                      onClick={() => amenitiesRemoveHandler(amenity)}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Paper>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          onClick={amenitiesUpdateHandler}
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          Update
        </Button>
      </Stack>
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
