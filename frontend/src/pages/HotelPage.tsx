import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFaqsQuery,
  useGetHotelDetailsQuery,
  // useGetReviewsQuery,
  useGetRoomsQuery,
} from "../store/api/hotelSlice";
import Loading from "../components/Loading";
import { BASEURL } from "../store/api/apiSlice";
import { Button, Rating, Tab, Tabs, Tooltip } from "@mui/material";
import { ScoreBadge } from "../components/HomePageItem";
import getHotelRating from "../utils/GetScoreRating";
import getBookingRating from "../utils/GetScoreRating";
import { getIcon } from "../components/icons/Icons";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTheme } from "@mui/material/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dining, Sanitizer } from "@mui/icons-material";
import Reviews from "../components/HotelPage/Reviews";
import Rooms from "../components/HotelPage/Rooms";
import { useAppSelector } from "../store/hooks";
import {
  useGetReviewsByHotelNotUserQuery,
  useGetReviewsByHotelUserQuery,
  useGetUserCanReviewQuery,
} from "../store/api/review-slice";
import AddIcon from "@mui/icons-material/Add";
import CreateReview from "../components/HotelPage/CreateReview";

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

let enableReview = false;
let enabledMessage: null | string = null;
const HotelPage = () => {
  const [rating, setRating] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();
  const nav = useNavigate();

  const {
    data: hotel,
    isLoading: hotelIsLoading,
    isError: hotelHasError,
  } = useGetHotelDetailsQuery({ id });
  //
  // const {
  //   data: reviews,
  //   isLoading: reviewsIsLoading,
  //   isError: reviewsIsError,
  // } = useGetReviewsQuery({ id });
  //
  const {
    data: reviewsByUser,
    isLoading: reviewsByUserIsLoading,
    isError: reviewsByUserIsError,
  } = useGetReviewsByHotelUserQuery(
    {
      hotelId: id as string,
      userId: user?.user_id.toString(),
    },
    {
      skip: !id || !user?.user_id,
    }
  );

  const {
    data: reviewsNotByUser,
    isLoading: reviewsNotByUserIsLoading,
    isError: reviewsNotByUserIsError,
  } = useGetReviewsByHotelNotUserQuery(
    {
      hotelId: id as string,
      userId: user?.user_id.toString(),
    },
    {
      skip: !id || !user?.user_id,
    }
  );

  const {
    data: rooms,
    isLoading: roomsIsLoading,
    isError: roomsIsError,
  } = useGetRoomsQuery({ id });

  const {
    data: faqs,
    isLoading: faqsIsLoading,
    isError: faqsIsError,
  } = useGetFaqsQuery({ id });

  const {
    data: userCanReview,
    isLoading: userCanReviewIsLoading,
    isError: userCanReviewIsError,
    error: userCanReviewError,
  } = useGetUserCanReviewQuery(
    {
      userId: user?.user_id as number,
      hotelId: id as string,
    },
    {
      skip: !id || !user?.user_id,
    }
  );

  if (userCanReviewIsError && !userCanReviewIsLoading) {
    console.log(userCanReviewError);
    if (
      typeof userCanReviewError === "object" &&
      (("detail" in userCanReviewError.data) as any)
    ) {
      console.log("yaha cha");
      enableReview = false;
      enabledMessage = userCanReviewError.data.detail;
    }
  } else if (
    typeof userCanReview === "object" &&
    "hasPermission" in userCanReview
  ) {
    enableReview = userCanReview.hasPermission;
    enabledMessage = userCanReview.hasPermission
      ? "You are eligible to leave a review!"
      : "You do not have permission to leave a review.";
  } else {
    enableReview = false;
    enabledMessage = "You do not have permission to leave a review.";
  }
  const overviewRef = React.useRef<HTMLDivElement>(null);

  const roomsRef = React.useRef<HTMLDivElement>(null);
  const reviewsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      hotelHasError ||
      reviewsByUserIsError ||
      reviewsNotByUserIsError ||
      roomsIsError
    ) {
      nav("/404");
    }
  }, [hotelHasError]);

  if (hotelIsLoading || roomsIsLoading || reviewsByUserIsLoading) {
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
        <Box
          color="blue"
          onClick={() => nav(-1)}
          display="flex"
          alignItems="center"
          gap={1}
          m={1}
          ml={-1}
          sx={{
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon /> Back
        </Box>
        <ImageList
          rowHeight={100}
          variant="masonry"
          sx={{ width: "100%", backgroundColor: "#fff" }}
          cols={4}
        >
          <ImageListItem cols={2} rows={2}>
            {hotel !== undefined && hotel.hotel_images !== undefined && (
              <img src={`${BASEURL}${hotel.hotel_images[0].image}`} />
            )}
          </ImageListItem>
          {rooms?.results?.map((room, index) => {
            return (
              <ImageListItem key={room.id} cols={2} rows={2}>
                <img src={room.image} alt={"hotel image"} loading="lazy" />
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
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}

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
            See all {hotel?.review_count} reviews
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
        <Rooms rooms={rooms} />
      </Box>

      <Box
        ref={reviewsRef}
        display="flex"
        width="75%"
        justifyContent="space-between"
        gap={2}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography component="h4" variant="h5">
              Frequently Asked Questions
            </Typography>
          </Box>
          <Box>
            {faqs?.map((faq) => {
              return (
                <Accordion id={faq.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
        <Box display="flex" width="40%" flexDirection="column" gap={2}>
          <Typography component="h4" variant="h5">
            Cleaning and Safety Practices
          </Typography>
          <Box
            sx={{
              backgroundColor: "#fff",
            }}
          >
            <List component="nav" aria-label="hotel safety measures">
              <ListItem>
                <ListItemIcon>
                  <AutoAwesomeIcon fill="black" />
                </ListItemIcon>
                <ListItemText primary="Enhanced cleanliness mesasures" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AutoAwesomeIcon fill="black" />
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
        sx={{ backgroundColor: "white" }}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Box>
            <Typography component="h4" variant="h5">
              Reviews
            </Typography>

            <Box display="flex" width="100%">
              <List>
                <ListItem>
                  <Tooltip title={enabledMessage}>
                    <span>
                      <Button
                        onClick={() => setShowModal(true)}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        variant="outlined"
                        disabled={!enableReview}
                      >
                        <AddIcon />
                        Create Review
                      </Button>
                    </span>
                  </Tooltip>
                  {showModal && (
                    <CreateReview
                      openModal={showModal}
                      onClose={() => setShowModal(false)}
                    />
                  )}
                </ListItem>
                <ListItem sx={{ display: "flex", gap: 3 }}>
                  {hotel?.hotel_score && (
                    <ScoreBadge score={hotel.hotel_score} />
                  )}
                  <Typography component="span" variant="h6">
                    {hotel?.hotel_score && getBookingRating(hotel.hotel_score)}
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", gap: 3 }}>
                  <Typography component="legend">Excellent</Typography>
                  <Rating name="disabled" value={rating} disabled max={10} />
                </ListItem>
                <ListItem sx={{ display: "flex", gap: 3 }}>
                  <Typography component="legend">Excellent</Typography>
                  <Rating name="disabled" value={rating} disabled max={10} />
                </ListItem>
                <ListItem sx={{ display: "flex", gap: 3 }}>
                  <Typography component="legend">Excellent</Typography>
                  <Rating name="disabled" value={rating} disabled max={10} />
                </ListItem>
                <ListItem sx={{ display: "flex", gap: 3 }}>
                  <Typography component="legend">Excellent</Typography>
                  <Rating name="disabled" value={rating} disabled max={10} />
                </ListItem>
                <ListItem sx={{ display: "flex", gap: 3 }}>
                  <Typography component="legend">Excellent</Typography>
                  <Rating name="disabled" value={rating} disabled max={10} />
                </ListItem>
              </List>
              <Reviews
                reviewsByUser={reviewsByUser}
                reviewsNotByUser={reviewsNotByUser}
                hotel={hotel}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default HotelPage;
