import { Avatar, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { ScoreBadge } from "../HomePageItem";
import { IHotelData, IHotelReview, IPaginated } from "../types/types";
import { CalendarMonth, Bed } from "@mui/icons-material";
import noReview from "../../assets/noReviewVector.webp";
import { useTheme } from "@mui/material/styles";

interface IReviews {
  reviews: IPaginated<IHotelReview> | undefined;
  hotel: IHotelData | undefined;
}

const Reviews = ({ reviews, hotel }: IReviews) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      // alignItems="flex-start"
      height="fit-content"
      // width="100%"
      padding={3}
      border={1}
    >
      {reviews && reviews.results?.length > 0 ? (
        reviews?.results?.map((review) => {
          return (
            <>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="30%"
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={review?.user_image}
                    sx={{ mr: 1, width: 50, height: 50 }}
                  />
                  <Box display="flex" flexDirection="column">
                    <Typography
                      component="span"
                      variant="h6"
                      fontSize={16}
                      color={theme.palette.text.primary}
                    >
                      hi
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      fontSize={14}
                      color={theme.palette.text.secondary}
                    ></Typography>
                  </Box>
                </Box>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Bed />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                        fontSize={14}
                      >
                        Duplex Suite
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarMonth />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                        fontSize={14}
                      >
                        Stayed 3 nights
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
              <Box width="60%" display="flex" gap={3} flexDirection="column">
                <Typography component="span" variant="caption">
                  Reviewed: {new Date(review.created_at).toLocaleString()}
                </Typography>
                <Typography component="span" variant="body1">
                  {review.review}
                </Typography>
              </Box>
              <Box
                height="50%"
                display="flex"
                justifyContent="flex-end"
                padding={1}
                alignItems="center"
                width="10%"
              >
                {hotel?.hotel_score && <ScoreBadge score={hotel.hotel_score} />}
              </Box>
            </>
          );
        })
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box component="img" src={noReview} width="350px" height="250px" />
          <Typography variant="body2">
            There are currently no reviews for the hotel at the moment! You can
            leave a review if you have previously booked the hotel from us!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Reviews;
