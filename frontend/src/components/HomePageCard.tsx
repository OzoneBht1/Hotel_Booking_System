import { Box } from "@mui/system";

import { styled } from "@mui/system";
import SearchForm from "./forms/SearchForm";
import { green } from "@mui/material/colors";
import { IQuery } from "./types/types";

interface IHomePageCardProps {
  onSearch: (searchQuery: IQuery) => void;
}

const StyledCard = styled(Box)(({ theme }) => ({
  height: "300px;",
  backgroundColor: "#fff",
  position: "relative",
  padding: 1,
  // bottom: "-30%",.

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

const HomePageCard = ({ onSearch }: IHomePageCardProps) => {
  return (
    <StyledCard>
      <SearchForm onSearch={onSearch} />
    </StyledCard>
  );
};

export default HomePageCard;
