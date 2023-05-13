import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
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
import TocIcon from "@mui/icons-material/Toc";
import CheckIcon from "@mui/icons-material/Check";

enum OrderOptions {
  Name = "name",
  Cheapest = "cheapest_price",
  Score = "hotel_score",
}

const SearchedResults = () => {
  const [params, setSearchParams] = useSearchParams();
  const searchQuery = params.get("term") || "";
  const checkInDate = params.get("checkInDate") || "";

  const checkOutDate = params.get("checkOutDate") || "";

  const [orderBy, setOrderBy] = useState<OrderOptions>(OrderOptions.Name);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [starRating, setStarRating] = useState<null | string>(null);
  const open = Boolean(anchorEl);

  const handleOrderBy = (orderBy: OrderOptions) => {
    setOrderBy(orderBy);
    setPage(1);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const people =
    params && params.get("people")
      ? parseInt(params.get("people") as string)
      : 0;

  const rooms =
    params && params.get("rooms") ? parseInt(params.get("rooms") as string) : 0;

  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetSearchedResultsQuery({
    searchQuery,
    checkInDate,
    checkOutDate,
    people,
    rooms,
    page,
    ordering: orderBy,
    min_price: priceRange[0],
    max_price: priceRange[1],
    min_score: starRating?.split("-")[0],
    max_score: starRating?.split("-")[1],
  } as IQuery);

  console.log(data);

  const itemsPerPage = 10;
  const totalItems = data?.count || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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

  const handleFilter = (price: [number, number], newRating: null | string) => {
    setPriceRange(price);

    if (newRating) {
      setStarRating(newRating);
    }

    setPage(1);
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
          <HotelListingFilter onFilter={handleFilter} />

          <Box display="flex" flexDirection="column" gap={3}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5" component="h2">
                Search Results : {data?.count} results found
              </Typography>
              <Button
                variant="contained"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                onClick={handleClick}
                size="large"
              >
                Order
                <TocIcon color="inherit" />
              </Button>
            </Box>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleOrderBy(OrderOptions.Name);
                  handleClose();
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  Name
                  {orderBy === OrderOptions.Name && (
                    <CheckIcon color="primary" />
                  )}
                </Box>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleOrderBy(OrderOptions.Cheapest);
                  handleClose();
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  Cheapest
                  {orderBy === OrderOptions.Cheapest && (
                    <CheckIcon color="primary" />
                  )}
                </Box>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleOrderBy(OrderOptions.Score);
                  handleClose();
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  Score
                  {orderBy === OrderOptions.Score && (
                    <CheckIcon color="primary" />
                  )}
                </Box>
              </MenuItem>
            </Menu>
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
                              loading="lazy"
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
              <Pagination
                onChange={handleChange}
                count={totalPages}
                page={page}
                color="primary"
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchedResults;
