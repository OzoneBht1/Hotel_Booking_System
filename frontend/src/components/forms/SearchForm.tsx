import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { Menu, MenuList } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuItem from "@mui/material/MenuItem";

const Search = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  backgroundColor: "white",
  padding: "0 10px",
  //   width: "100%",
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
  width: "80%",
  height: "40px",
}));

const Icon = styled(Box)(({ theme }) => ({
  width: 30,
  height: 30,
}));

const PlusMinusIcon = styled(Box)(({ theme }) => ({
  width: 25,
  height: 25,
  border: "1px solid #ccc",
  borderRadius: "50%",
}));

const BookingDetails = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#333",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const SearchForm = () => {
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<Date | null>(
    null
  );
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<Date | null>(
    null
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [adults, setAdults] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleAdultsChange = (increment: number) => {
    setAdults(adults + increment);
  };
  const handleChildrenChange = (increment: number) => {
    setChildrenNum(childrenNum + increment);
  };

  const handleRoomChange = (increment: number) => {
    setRooms(rooms + increment);
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formSubmitHandler = () => {};

  return (
    <Box
      component="form"
      onSubmit={formSubmitHandler}
      display="flex"
      flexDirection="column"
      flexGrow={1}
      justifyContent="space-around"
      alignItems="center"
    >
      <Search>
        <Icon>
          <SearchIcon />
        </Icon>
        <InputBase
          placeholder="Where would you like to go?"
          color="info"
          fullWidth={true}
        />
      </Search>
      <BookingDetails>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={selectedCheckInDate}
            onChange={(newValue) => {
              setSelectedCheckInDate(newValue);
            }}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={selectedCheckOutDate}
            onChange={(newValue) => {
              setSelectedCheckOutDate(newValue);
            }}
          />
        </LocalizationProvider>
        <Button onClick={handleMenuOpen} variant="contained">
          Open Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 250,
              border: "1px solid #d3d4d5",
            },
          }}
        >
          <MenuList>
            <MenuItem>
              <StyledBox>
                <StyledTypography>Rooms:</StyledTypography>
                <Box display="flex" alignItems="center">
                  <Button onClick={() => handleRoomChange(-1)}>
                    <PlusMinusIcon>
                      <RemoveIcon />
                    </PlusMinusIcon>
                  </Button>
                  <StyledTypography>{rooms}</StyledTypography>
                  <Button onClick={() => handleRoomChange(1)}>
                    <PlusMinusIcon>
                      <AddIcon />
                    </PlusMinusIcon>
                  </Button>
                </Box>
              </StyledBox>
            </MenuItem>

            <MenuItem>
              <StyledBox>
                <StyledTypography>Adults:</StyledTypography>
                <Box display="flex" alignItems="center">
                  <Button onClick={() => handleAdultsChange(-1)}>
                    <PlusMinusIcon>
                      <RemoveIcon />
                    </PlusMinusIcon>
                  </Button>
                  <StyledTypography>{adults}</StyledTypography>
                  <Button onClick={() => handleAdultsChange(1)}>
                    <PlusMinusIcon>
                      <AddIcon />
                    </PlusMinusIcon>
                  </Button>
                </Box>
              </StyledBox>
            </MenuItem>

            <MenuItem>
              <StyledBox>
                <StyledTypography>Children:</StyledTypography>
                <Box display="flex" alignItems="center">
                  <Button onClick={() => handleChildrenChange(-1)}>
                    <PlusMinusIcon>
                      <RemoveIcon />
                    </PlusMinusIcon>
                  </Button>
                  <StyledTypography>{childrenNum}</StyledTypography>
                  <Button onClick={() => handleChildrenChange(1)}>
                    <PlusMinusIcon>
                      <AddIcon />
                    </PlusMinusIcon>
                  </Button>
                </Box>
              </StyledBox>
            </MenuItem>
          </MenuList>
        </Menu>
      </BookingDetails>
      <Button
        type="submit"
        variant="contained"
        sx={{ position: "absolute", bottom: -10 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;
