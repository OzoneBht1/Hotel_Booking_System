import React from "react";
import { useLocation } from "react-router-dom";

import {
  Box,
  Button,
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
import { BASEURL } from "../store/api/apiSlice";
import { ScoreBadge } from "../components/HomePageItem";
const dummyListings = [
  {
    image: `${BASEURL}/media/hotel_images/361374662.webp`,
    headline: "Luxury Suite at The Ritz",
    description:
      "Enjoy a luxurious stay at The Ritz with our luxury suite. Our suite features a king-size bed, a spacious living area, and a balcony with stunning city views.",
    address: "1234 Main St, Anytown, USA",
  },
  {
    image: `${BASEURL}/media/hotel_images/361374662.webp`,
    headline: "Beachfront Villa",
    description:
      "Relax in our beautiful beachfront villa. Our villa features three bedrooms, two bathrooms, a private pool, and stunning ocean views.",
    address: "5678 Ocean Dr, Anytown, USA",
  },
  {
    image: `${BASEURL}/media/hotel_images/361374662.webp`,
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
  console.log(location.search);
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
        <Box display="flex" width="70%" justifyContent={"center"}>
          <Box width="40%">bla</Box>

          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h5" component="h2">
              Search Results : 250 results found
            </Typography>
            {dummyListings.map((listing, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    padding: 1,
                  }}
                >
                  <CardContent>
                    <Box display="flex" gap={2} alignItems={"flex-start"}>
                      <Box width="25%" height="200px">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100%"
                            image={listing.image}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Box>
                      <Box flex={1}>
                        <Box>
                          <Typography gutterBottom variant="h5" component="h2">
                            {listing.headline}
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
                          <Button>View Details</Button>
                        </Box>
                      </Box>
                      {/* <Box display="flex" flexDirection="column"> */}

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
                            Excellent
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            2052 reviews
                          </Typography>
                        </Box>
                        <ScoreBadge score={4.5} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchedResults;
