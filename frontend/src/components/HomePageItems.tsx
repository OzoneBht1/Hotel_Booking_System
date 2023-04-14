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
const countries = ["France", "United Kingdom", "Netherlands", "Austria"];

const StyledBox = styled(Box)(({ theme }) => ({
  // display: "flex",
  // width: "100%",
  flexWrap: "wrap",
  // justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  margin: "1rem",
  marginTop: "7rem",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "15rem",
  },
}));

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

const HomePageItems = () => {
  const {
    data: countryApiData,
    isError,
    isLoading,
  } = useGetHomePageItemsQuery();

  // if (isError) {
  //   return <Error />;
  // }
  return (
    <StyledBox>
      {isLoading ? (
        <Loading />
      ) : countryApiData?.length === 0 ? (
        <p>No Data Found.</p>
      ) : (
        <StyledBox>
          {countryApiData &&
            countries.map((country) => (
              <Stack gap={4} marginBottom={8} key={country}>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{ alignSelf: "flex-start" }}
                  whiteSpace="nowrap"
                >
                  Hotels in {country}
                </Typography>
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
                  {countryApiData.map(
                    (apidata) =>
                      apidata.address.includes(country) && (
                        <HomePageItem key={apidata.id} {...apidata} />
                      )
                  )}
                </Carousel>
              </Stack>
            ))}
        </StyledBox>
      )}
    </StyledBox>
  );
};

export default HomePageItems;
