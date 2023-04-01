import React from "react";
import { useLocation } from "react-router-dom";

import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SearchForm from "../components/forms/SearchForm";
import { FilterCenterFocus } from "@mui/icons-material";
import FilteredListSearch from "../components/forms/FilteredListSearch";

const dummyListings = [
  {
    image: "https://picsum.photos/200/300",
    headline: "Luxury Suite at The Ritz",
    description:
      "Enjoy a luxurious stay at The Ritz with our luxury suite. Our suite features a king-size bed, a spacious living area, and a balcony with stunning city views.",
    address: "1234 Main St, Anytown, USA",
  },
  {
    image: "https://picsum.photos/200/300",
    headline: "Beachfront Villa",
    description:
      "Relax in our beautiful beachfront villa. Our villa features three bedrooms, two bathrooms, a private pool, and stunning ocean views.",
    address: "5678 Ocean Dr, Anytown, USA",
  },
  {
    image: "https://picsum.photos/200/300",
    headline: "Mountain Getaway",
    description:
      "Escape to the mountains in our cozy cabin. Our cabin features two bedrooms, one bathroom, a wood-burning fireplace, and beautiful mountain views.",
    address: "9101 Mountain Rd, Anytown, USA",
  },
];

const SearchedResults = () => {
  const location = useLocation();
  const searchHandler = () => {
    console.log("something");
  };
  console.log(location);
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
        top={66}
        zIndex={1}
      >
        <FilteredListSearch onSearch={searchHandler} />
      </Box>
      <Box display="flex">
        <Box width="30%">{/*left box  */}</Box>
        <Box flex={1}>
          {dummyListings.map((listing, index) => (
            <Box key={index} mb={2} mt={2}>
              <Card>
                <CardMedia component="img" height="200" />
                <CardContent>
                  <Box display="flex">
                    <Box width="30%">
                      <img src={listing.image} alt="listing" />
                    </Box>
                    <Box flex="1">
                      <Typography gutterBottom variant="h5" component="h2">
                        {listing.headline}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
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
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <button>View Details</button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SearchedResults;
