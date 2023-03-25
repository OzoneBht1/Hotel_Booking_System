import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IHotelData } from "../components/types/types";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelDetailsQuery } from "../store/api/hotelSlice";
import Loading from "../components/Loading";
import { BASEURL } from "../store/api/apiSlice";
import { Button, Tab, Tabs } from "@mui/material";
import { ScoreBadge } from "../components/HomePageItem";
import getHotelRating from "../utils/GetScoreRating";
import getBookingRating from "../utils/GetScoreRating";
import { getIcon } from "../components/icons/Icons";
import Room1 from "../assets/rooms/room1.jpg";
import Room2 from "../assets/rooms/room2.jpg";
import Room3 from "../assets/rooms/room3.jpg";
import Room4 from "../assets/rooms/room4.jpg";
import Room5 from "../assets/rooms/room5.jpg";
import Room6 from "../assets/rooms/room6.jpg";
import Room7 from "../assets/rooms/room7.jpg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useGetLocationDetailQuery } from "../store/api/postitionStackSlice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import {
//   CleanHandsRounded,
//   LocalLaundryServiceRounded,
//   SanitizerRounded,
//   CheckCircleRounded,
//   LocalDiningRounded,
//   RoomServiceRounded,
//   VerifiedUserRounded,
//   DirectionsRunRounded,
//   StayCurrentPortraitRounded,
// } from "@material-ui/icons";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dining, Sanitizer, StorefrontSharp } from "@mui/icons-material";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  // width: "100%",
  // justifyContent: "center",
  gap: "32px",
  // maxWidth: "1100px",
}));
const HotelPage = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const { id } = useParams();
  const theme = useTheme();
  const nav = useNavigate();
  const {
    data: hotel,
    isLoading: hotelIsLoading,
    isError: hotelHasError,
  } = useGetHotelDetailsQuery({ id });

  console.log(hotel);

  const { data, isLoading, isError, error } = useGetLocationDetailQuery({
    lat: 48.874707,
    lng: 2.2936761,
  });
  console.log(data);
  console.log(error);

  const overviewRef = React.useRef<HTMLDivElement>(null);
  const roomsRef = React.useRef<HTMLDivElement>(null);
  const reviewsRef = React.useRef<HTMLDivElement>(null);
  console.log(hotel);
  useEffect(() => {
    if (hotelHasError) {
      nav("/404");
    }
  }, [hotelHasError]);

  const hotelImages = [
    {
      id: 1,
      img: Room1,
    },
    {
      id: 2,
      img: Room2,
    },
    {
      id: 3,
      img: Room3,
    },
    {
      id: 4,
      img: Room4,
    },
    {
      id: 5,
      img: Room5,
    },
    {
      id: 6,
      img: Room6,
    },
    {
      id: 7,
      img: Room7,
    },
  ];
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  if (hotelIsLoading) {
    return <Loading />;
  }

  return (
    <StyledBox>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width={"70%"}
        gap={1}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <ArrowBackIcon /> See all properties
        </Box>
        <ImageList
          rowHeight={100}
          variant="masonry"
          sx={{ width: "100%" }}
          cols={4}
        >
          <ImageListItem cols={2} rows={2}>
            {hotel !== undefined && hotel.hotel_images !== undefined && (
              <img src={`${BASEURL}${hotel.hotel_images[0].image}`} />
            )}
          </ImageListItem>
          {hotelImages.map((image, index) => {
            return (
              <ImageListItem key={image.id} cols={2} rows={2}>
                <img src={image.img} alt={"hotel image"} loading="lazy" />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "flex-start",
          width: "75%",
        }}
      >
        <Tabs>
          <Tab
            onClick={() =>
              overviewRef!.current!.scrollIntoView({ behavior: "smooth" })
            }
            label="Overview"
          />
          <Tab
            onClick={() =>
              roomsRef!.current!.scrollIntoView({ behavior: "smooth" })
            }
            label="Rooms"
          />
          <Tab
            onClick={() =>
              reviewsRef!.current!.scrollIntoView({ behavior: "smooth" })
            }
            label="Reviews"
          />
        </Tabs>
      </Box>

      <Box
        ref={overviewRef}
        display="flex"
        width="75%"
        padding={2}
        // gap={12}
        // justifyContent="space-around"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography component="h2" variant="h4">
            {hotel?.name}
          </Typography>
          {/* <ScoreBadge score={hotel?.score} /> */}

          <Box display="flex" alignItems="center" gap={1}>
            <ScoreBadge score={7.6} />

            <Typography component="span" fontSize={"1rem"} color="secondary">
              {getHotelRating(7.6)}
            </Typography>
          </Box>

          <Typography component="span" fontSize={"1rem"} color="blue">
            See all 1,234 reviews
          </Typography>
          <Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography component="h3" variant="h6">
                Popular Amenties
              </Typography>
              <Box display="flex" flexWrap="wrap" lineHeight={3}>
                {hotel?.amenities.map((amenity) => (
                  <Box
                    key={amenity}
                    width="50%"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    {getIcon(amenity)}
                    <Typography
                      component="span"
                      variant="caption"
                      lineHeight={3}
                    >
                      {amenity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-start"
          width="450px"
        >
          <iframe
            src={`https://maps.google.com/maps?q=${hotel?.lat},${hotel?.lng}&hl=es;z=14&output=embed`}
            width={410}
            height={240}
            // allowFullScreen
          ></iframe>
        </Box>
      </Box>
      <Box
        ref={roomsRef}
        display="flex"
        flexDirection="column"
        width="75%"
        alignItems="flex-start"
        gap={2}
      >
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
                  Dessert (100g serving)
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.primary.contrastText }}
                  align="right"
                >
                  Calories
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.primary.contrastText }}
                  align="right"
                >
                  Fat&nbsp;(g)
                </TableCell>

                <TableCell
                  sx={{ color: theme.palette.primary.contrastText }}
                  align="right"
                >
                  Protein&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box display="flex" flexDirection={"column"} gap={1}>
                      <Typography
                        component="span"
                        variant="h6"
                        fontSize={14}
                        fontWeight="700px"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => setOpen(true)}
                      >
                        {row.name}
                      </Typography>
                      <Typography component="span" variant="caption">
                        {"1 bed"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">
                    <Button sx={{ width: "80%" }} variant="contained">
                      Book
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        ref={reviewsRef}
        display="flex"
        width="75%"
        alignItems="flex-start"
        gap={2}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography component="h4" variant="h5">
              Frequently Asked Questions
            </Typography>
          </Box>
          <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Accordion 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>{" "}
        </Box>
        <Box>
          <Typography component="h4" variant="h5">
            Cleaning and Safety Practices
          </Typography>
          <Box>
            <List component="nav" aria-label="hotel safety measures">
              <ListItem>
                <ListItemIcon>
                  <AutoAwesomeIcon fill="black" />
                </ListItemIcon>
                <ListItemText primary="Enhanced cleanliness mesasures" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SocialDistanceIcon />
                </ListItemIcon>
                <ListItemText primary="Social Distancing" />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Sanitizer />
                </ListItemIcon>
                <ListItemText primary="Disinfection with electrostatic spray" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Dining />
                </ListItemIcon>
                <ListItemText primary="Enhanced food service safety" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>

      <Box
        ref={reviewsRef}
        display="flex"
        width="75%"
        alignItems="flex-start"
        gap={2}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography component="h4" variant="h5">
              Reviews
            </Typography>
            <Box>
              <List>
                <ListItem>
                  <Typography component="span" variant="h5">
                    10.0
                  </Typography>
                  <Typography component="span" variant="h6">
                    Excellent
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default HotelPage;
