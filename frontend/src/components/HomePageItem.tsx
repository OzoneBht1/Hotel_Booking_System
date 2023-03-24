import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useTheme } from "@mui/material/styles";
import getScore from "../utils/GetScoreRating";
import { IHomePageItems } from "./types/types";
import { BASEURL } from "../store/api/apiSlice";
import DefaultImage from "../assets/default-hotel-image.jpg";
import { useNavigate } from "react-router-dom";

const HomePageItem = (props: IHomePageItems) => {
  const nav = useNavigate();
  const cardClickHandler = () => {
    console.log(props);
    console.log("clicked");
    nav(`/hotel/${props.id}`);
  };

  return (
    <Card sx={{ maxWidth: 300 }} elevation={0} onClick={cardClickHandler}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="190"
          image={
            props.hotel_images
              ? `${BASEURL}${props.hotel_images[0].image}`
              : DefaultImage
          }
          alt="green iguana"
        />
        <CardContent>
          <Stack direction={"column"}>
            <Typography
              gutterBottom
              variant="h6"
              lineHeight={1.2}
              marginBottom={0.5}
              component="div"
              sx={{ opacity: 0.8 }}
            >
              {props.name}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{ opacity: 0.8 }}
            >
              {props.description}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography component="span" color="text.secondary">
                Starting From
              </Typography>
              <Typography variant="body2">₹ 1000</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ScoreBadge score={props.hotel_score} />
              <Typography
                component="span"
                fontSize={"1rem"}
                color="text.secondary"
              >
                {getScore(props.hotel_score)}
              </Typography>
              <Typography
                component="span"
                fontSize={"0.8rem"}
                color="text.secondary"
              >
                {props.numReviews} Reviews
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HomePageItem;

export const ScoreBadge = ({ score }: { score: number }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.5rem",
        height: "1.5rem",
        borderRadius: "10%",
        backgroundColor:
          score >= 7 ? theme.palette.primary.dark : theme.palette.grey[600],
      }}
    >
      <Typography variant="body2" color="white">
        {score}
      </Typography>
    </Box>
  );
};
