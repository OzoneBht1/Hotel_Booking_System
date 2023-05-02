import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styled } from "@mui/material/styles";
import { amenitiesMap } from "../icons/Icons";
import { listActions } from "../../store/list-slice";

interface IListPropertiesAmenitiesProps {
  onClickNext: () => void;
  onClickPrev: () => void;
}

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  gap: 1,
  color: theme.palette.text.secondary,
}));

const ListPropertiesTransportation = ({
  onClickNext,
  onClickPrev,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state);

  const nextClickHandler = () => {
    onClickNext();
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(
        listActions.addAmenity({
          amenity: e.target.value,
        })
      );
    } else {
      dispatch(
        listActions.removeAmenity({
          amenity: e.target.value,
        })
      );
    }
  };
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: "100%",
          gap: 5,
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" component="h4">
            Transportation Features
          </Typography>
          <Typography variant="body2">Select all that apply*</Typography>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Object.keys(amenitiesMap).map((amenity) => {
            const amenityObj = amenitiesMap[amenity];
            if (amenityObj.category === "Transportation") {
              return (
                <Grid item xs={4} key={amenity}>
                  <Box display="flex" alignItems="center">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleAmenitiesChange}
                            value={amenity}
                            checked={list.amenities.includes(amenity) || false}
                            name={amenity}
                          />
                        }
                        label={
                          <Item>
                            {amenityObj.icon}
                            {amenity}
                          </Item>
                        }
                      />
                    </FormGroup>
                  </Box>
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
      <Box
        display="flex"
        width="86%"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Button
          sx={{ width: "20%", marginRight: "auto" }}
          color="secondary"
          variant="outlined"
          onClick={() => onClickPrev()}
        >
          Previous
        </Button>
        <Button
          sx={{ width: "20%", mt: 2 }}
          variant="contained"
          onClick={nextClickHandler}
          type="button"
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ListPropertiesTransportation;
