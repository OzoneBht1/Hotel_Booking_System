import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IHotelData } from "../components/types/types";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
const HotelPage = ({
  id,
  address,
  category,
  countInStock,
  description,
  name,
  numReviews,
  hotel_images,
  price,
  rating,
}: IHotelData) => {
  let hotel_image_col: string[] = [];
  if (hotel_images) {
    hotel_image_col = [
      hotel_images[0].image,
      hotel_images[0].image,
      hotel_images[0].image,
      hotel_images[0].image,
      hotel_images[0].image,
      hotel_images[0].image,
    ];
  }
  console.log(hotel_images);

  return (
    <StyledBox>
      <Box sx={{ color: "blue" }}>
        <ArrowBackIcon /> See all properties
      </Box>

      <ImageList variant="masonry" cols={3} gap={8}>
        {hotel_image_col.map((item) => (
          <ImageListItem key={item}>
            <img src={item} />
          </ImageListItem>
        ))}
      </ImageList>
    </StyledBox>
  );
};

export default HotelPage;
