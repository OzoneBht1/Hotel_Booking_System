import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/system";
import SearchForm from "./forms/SearchForm";
import { green } from "@mui/material/colors";

const StyledCard = styled(Box)(({ theme }) => ({
  height: "280px",
  backgroundColor: "#fff",
  position: "relative",
  // bottom: "-30%",.
  padding: "1px",

  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",

  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "90%",
    bottom: "-60%",
  },
  [theme.breakpoints.up("md")]: {
    width: "80%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "70%",
  },
}));

const HomePageCard = () => {
  const searchHandler = (searchTerm: string) => {
    console.log(searchTerm);
  };

  return (
    <StyledCard>
      <SearchForm onSearch={searchHandler} />
    </StyledCard>
  );
};

export default HomePageCard;
