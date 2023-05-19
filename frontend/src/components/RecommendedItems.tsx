import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import HomePageItem from "./HomePageItem";
import { styled } from "@mui/system";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "react-query";
import { useGetHomePageItemsQuery } from "../store/api/hotelSlice";
import Loading from "./Loading";
import Error from "../pages/404";
import { ArrowLeft, ArrowLeftRounded, ArrowRight } from "@mui/icons-material";
import StarsIcon from "@mui/icons-material/Stars";
import { useAppSelector } from "../store/hooks";

import { amber } from "@mui/material/colors";

const RecommendedItems = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1628 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 1628, min: 1318 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1318, min: 1005 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1005, min: 665 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 665, min: 0 },
      items: 1,
    },
  };

  const { hotels: recommendedHotels } = useAppSelector(
    (state) => state.history
  );
  return (
    recommendedHotels && (
      <Stack gap={4}>
        <Stack direction="row" alignItems="center">
          <StarsIcon sx={{ width: 45, height: 45, color: `${amber[400]}` }} />
          <Typography
            variant="h4"
            component="h4"
            sx={{
              alignSelf: "flex-start",
              fontWeight: 500,
              color: `${amber[400]}`,
            }}
            whiteSpace="nowrap"
          >
            Recommended Hotels
          </Typography>
        </Stack>
        <Carousel
          responsive={responsive}
          infinite={true}
          // autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType="desktop"
        >
          {recommendedHotels.map((hotel) => (
            <HomePageItem key={hotel.id} {...hotel} />
          ))}
        </Carousel>
      </Stack>
    )
  );
};

export default RecommendedItems;
