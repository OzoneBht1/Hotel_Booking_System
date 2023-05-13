import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Button, Stack, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface IHotelListingFilterProps {
  onFilter: (price: [number, number], starRating: string | null) => void;
}

const HotelListingFilter = ({ onFilter }: IHotelListingFilterProps) => {
  const theme = useTheme();
  const [selectedStarRating, setSelectedStarRating] = useState<null | string>(
    null
  );
  const [price, setPrice] = useState<[number, number]>([0, 1500]);

  console.log(selectedStarRating);

  const handleFilter = () => {
    onFilter(price, selectedStarRating);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStarRating(e.target.value);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 50,
        left: 0,
        border: `1px solid ${grey[300]}`,
        backgroundColor: `${grey[200]}`,
        display: "flex",
      }}
      height="fit-content"
      minWidth={330}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={5}
        width="100%"
        padding={2}
      >
        <Typography component="h2" variant="h6">
          Filter
        </Typography>
        <Stack>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Stars</FormLabel>
            <RadioGroup
              sx={{ gap: -1 }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                componentsProps={{
                  typography: { variant: "body2", fontSize: 14 },
                }}
                value="9-10"
                control={<Radio onChange={handleChange} />}
                label="9-10"
              />
              <FormControlLabel
                componentsProps={{
                  typography: { variant: "body2", fontSize: 14 },
                }}
                value="8-9"
                control={<Radio onChange={handleChange} />}
                label="8-9"
              />
              <FormControlLabel
                value="7-8"
                componentsProps={{
                  typography: { variant: "body2", fontSize: 14 },
                }}
                control={<Radio onChange={handleChange} />}
                label="7-8"
              />
              <FormControlLabel
                value="6-7"
                componentsProps={{
                  typography: { variant: "body2", fontSize: 14 },
                }}
                control={<Radio onChange={handleChange} />}
                label="6-7"
              />
              <FormControlLabel
                value="5-6"
                componentsProps={{
                  typography: { variant: "body2", fontSize: 14 },
                }}
                control={<Radio onChange={handleChange} />}
                label="5-6"
              />
              <FormControlLabel
                value="2.5-5"
                color="success"
                componentsProps={{
                  typography: { variant: "body2", fontSize: 14 },
                }}
                control={<Radio onChange={handleChange} />}
                label="Below 5"
              />
            </RadioGroup>
          </FormControl>{" "}
        </Stack>
        <Box width="90%" display="flex" flexDirection="column" gap={2}>
          <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>

          <Slider
            range
            min={0}
            max={1000}
            value={price}
            onChange={(value) => setPrice(value as [number, number])}
            railStyle={{ backgroundColor: "#CBD5E0" }}
            trackStyle={[{ backgroundColor: "#4299E1" }]}
            handleStyle={[
              { backgroundColor: "#FFFFFF", border: "2px solid #4299E1" },
              { backgroundColor: "#FFFFFF", border: "2px solid #4299E1" },
            ]}
          />
          <Box display="flex" width="100%" justifyContent="space-between">
            <Box>{price[0]}</Box>
            <Box>{price[1]}</Box>
          </Box>
        </Box>

        <Button
          onClick={handleFilter}
          sx={{ width: "30%" }}
          variant="contained"
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
};

export default HotelListingFilter;
