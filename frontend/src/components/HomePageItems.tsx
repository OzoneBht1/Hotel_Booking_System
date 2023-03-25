import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import HomePageItem from "./HomePageItem";
import { styled } from "@mui/system";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "react-query";
import { useGetHomePageItemsQuery } from "../store/api/hotelSlice";
import Loading from "./Loading";
import Error from "../pages/404";
const countries = ["France", "United Kingdom", "Netherlands", "Austria"];

const StyledBox = styled(Box)(({ theme }) => ({
  // display: "flex",
  // width: "100%",
  flexWrap: "wrap",
  alignItems: "flex-start",
  // justifyContent: "center",
  overflow: "hidden",
  margin: "1rem",
  marginTop: "15rem",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "10rem",
  },
}));

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1285 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1285, min: 985 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 985, min: 665 },
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

  useEffect(() => {
    console.log(countryApiData);
  }, [countryApiData]);

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
              <React.Fragment key={country}>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{ alignSelf: "flex-start" }}
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
              </React.Fragment>
            ))}
        </StyledBox>
      )}
    </StyledBox>
  );
};

export default HomePageItems;
