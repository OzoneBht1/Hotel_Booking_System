import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/system";
import SearchForm from "./forms/SearchForm";

const StyledCard = styled(Box)({
  width: "60%",
  height: "350px",
  backgroundColor: "#fff",
  position: "relative",
  bottom: "-60%",

  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
});

const StyledFormWrapper = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  // flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
});

const HomePageCard = () => {
  return (
    <StyledCard>
      <StyledFormWrapper>
        <SearchForm />
      </StyledFormWrapper>
    </StyledCard>
  );
};

export default HomePageCard;
