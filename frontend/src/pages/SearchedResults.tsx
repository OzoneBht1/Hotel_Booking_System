import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";
import FilteredListSearch from "../components/forms/FilteredListSearch";
import { BASEURL } from "../store/api/apiSlice";
import { ScoreBadge } from "../components/HomePageItem";
import HotelListingFilter from "../components/HotelListingFilter";
import { useGetSearchedResultsQuery } from "../store/api/hotelSlice";
import { IQuery } from "../components/types/types";
import Error from "./404";
import Loading from "../components/Loading";
import { Stack } from "@mui/system";
import getBookingRating from "../utils/GetScoreRating";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const SearchedResults = () => {
  const [params, setSearchParams] = useSearchParams();
  const searchQuery = params.get("term") || "";
  const checkInDate = params.get("checkInDate") || "";

  const checkOutDate = params.get("checkOutDate") || "";
  const people =
    params && params.get("people")
      ? parseInt(params.get("people") as string)
      : 0;

  const rooms =
    params && params.get("rooms") ? parseInt(params.get("rooms") as string) : 0;

  const { data, isLoading, isError } = useGetSearchedResultsQuery({
    searchQuery,
    checkInDate,
    checkOutDate,
    people,
    rooms,
  } as IQuery);

  console.log(data);

  const nav = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const searchHandler = () => {
    console.log("something");
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          backgroundColor: "primary.dark",
        }}
        alignItems="center"
        width="100%"
        position="sticky"
        left={0}
        top={70}
        zIndex={1}
      >
        <FilteredListSearch onSearch={searchHandler} />
      </Box>
      <Box padding={2} display="flex" justifyContent={"center"} width="100%">
        <Box display="flex" width="80%" gap={4} justifyContent={"center"}>
          <HotelListingFilter />

          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h5" component="h2">
              Search Results : {data?.count} results found
            </Typography>
            {data?.results?.map((listing, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    padding: 1,
                  }}
                >
                  <CardActionArea onClick={() => nav(`/hotel/${listing.id}`)}>
                    <CardContent>
                      <Box display="flex" gap={2} alignItems={"flex-start"}>
                        <Box width="25%" height="200px">
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="100%"
                              image={
                                listing.hotel_images &&
                                listing.hotel_images[0].image &&
                                `${BASEURL}${listing.hotel_images[0].image}`
                              }
                              alt="green iguana"
                            />
                          </CardActionArea>
                        </Box>
                        <Box flex={1}>
                          <Box display="flex" flexDirection="column" gap={0.5}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {listing.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              textOverflow="ellipsis"
                            >
                              {listing.description}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {listing.address}
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="column"
                              gap={2}
                              mt={1}
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  fontSize: "12px",
                                  width: "fit-content",
                                  height: "30px",
                                }}
                              >
                                View on Map
                              </Button>

                              <Typography>
                                Total Available Rooms : {listing.room_count}
                              </Typography>

                              <Stack
                                alignItems="center"
                                gap={1}
                                direction="row"
                              >
                                <Typography fontSize="20px">
                                  Price Starting From :{" "}
                                </Typography>

                                <Typography
                                  fontWeight="bold"
                                  color="blueviolet"
                                  fontSize="20px"
                                >
                                  {" "}
                                  ${listing.cheapest_price}
                                </Typography>
                              </Stack>
                            </Box>
                          </Box>
                        </Box>
                        {/* <Box display="flex" flexDirection="column"> */}

                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-end"
                          height="100%"
                        >
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent={"flex-start"}
                            gap={1}
                          >
                            <Box display="flex" flexDirection="column">
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {getBookingRating(listing.hotel_score)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {`${listing.review_count} ${
                                  listing.review_count > 1
                                    ? "Reviews"
                                    : "Review"
                                }`}
                              </Typography>
                            </Box>
                            <ScoreBadge score={listing.hotel_score} />
                          </Box>
                          <Button
                            variant="contained"
                            sx={{
                              display: "flex",
                              marginTop: "8.5rem",

                              justifySelf: "flex-end",
                              gap: 1,
                            }}
                          >
                            <Typography
                              marginRight="1px"
                              color="white"
                              fontWeight="bold"
                            >
                              View Details
                            </Typography>
                            <ArrowRightAltIcon sx={{ color: "primary" }} />
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
            {data && data.count > 10 && (
              <Pagination count={data?.count / 10} color="primary" />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchedResults;
