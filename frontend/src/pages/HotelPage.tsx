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
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  // width: "100%",
  gap: "32px",
  maxWidth: "1100px",
}));
const HotelPage = () => {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const nav = useNavigate();
  const { data: hotels, isLoading, isError } = useGetHotelDetailsQuery({ id });

  useEffect(() => {
    if (isError) {
      nav("/404");
    }
  }, [isError]);

  return (
    <StyledBox>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "blue",
        }}
      >
        <ArrowBackIcon /> See all properties
      </Box>

      <ImageList
        variant="masonry"
        sx={{ width: 1100, height: 450 }}
        cols={3}
        rowHeight={164}
      >
        {itemData.map((item) => {
          const rows = item.featured ? 2 : 1;
          const cols = item.featured ? 4 : 3;
          return (
            <ImageListItem key={item.img} rows={rows} cols={cols}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
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
];
