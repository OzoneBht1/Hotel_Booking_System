import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const HotelListingFilter = () => {
  const theme = useTheme();
  const [price, setPrice] = useState<[number, number]>([0, 1500]);

  // useEffect(() => {
  //    if (!!category) {
  //      setFilteredProducts(
  //        products.filter(
  //          (product) =>
  //            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //            product.category === category.toLowerCase() &&
  //            product.price >= value[0] &&
  //            product.price <= value[1]
  //        )
  //      );
  //    } else {
  //      setFilteredProducts(
  //        products.filter(
  //          (product) =>
  //            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //            product.price >= value[0] &&
  //            product.price <= value[1]
  //        )
  //      );
  //    }
  //  }, [products, searchTerm, value, category]);
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
      height="70vh"
      minWidth={350}
    >
      <Box width="100%">
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
    </Box>
  );
};

export default HotelListingFilter;
