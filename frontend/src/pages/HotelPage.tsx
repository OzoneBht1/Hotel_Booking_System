import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IHotelData } from "../components/types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelDetailsQuery } from "../store/api/hotelSlice";
import Loading from "../components/Loading";
import { BASEURL } from "../store/api/apiSlice";
import { Tab, Tabs, Typography } from "@mui/material";
import { ScoreBadge } from "../components/HomePageItem";
import getHotelRating from "../utils/GetScoreRating";
import getBookingRating from "../utils/GetScoreRating";
import { getIcon } from "../components/icons/Icons";
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
  const { id } = useParams();
  const nav = useNavigate();
  const { data: hotel, isLoading, isError } = useGetHotelDetailsQuery({ id });
  const overviewRef = React.useRef<HTMLDivElement>(null);
  const roomsRef = React.useRef<HTMLDivElement>(null);
  const reviewsRef = React.useRef<HTMLDivElement>(null);
  console.log(hotel);
  useEffect(() => {
    if (isError) {
      nav("/404");
    }
  }, [isError]);

  if (isLoading) {
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
        <ImageList variant="masonry" sx={{ width: "100%" }} cols={4}>
          {itemData.map((item) => {
            const rows = item.featured ? 2 : 1;
            const cols = item.featured ? 5 : 5;
            return (
              <ImageListItem key={item.img} rows={rows} cols={cols}>
                <img
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
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
            label="Amenities"
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
      <Box ref={roomsRef} display="flex" flexDirection="column" gap={2}>
        <Typography component="h4" variant="h5">
          Rooms
        </Typography>
      </Box>
    </StyledBox>
  );
};

export default HotelPage;
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
];
