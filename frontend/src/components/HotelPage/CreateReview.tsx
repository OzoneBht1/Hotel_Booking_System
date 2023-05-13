import { Modal, Rating, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import getBookingRating from "../../utils/GetScoreRating";
import StarIcon from "@mui/icons-material/Star";
import {
  useCreateReviewMutation,
  useGetSingleBookingQuery,
} from "../../store/api/review-slice";
import { useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

interface ICreateReview {
  openModal: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "white",
  border: "2px solid #000",
  display: "flex",
  flexDirection: "column" as "column",
  gap: 2,

  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const CreateReview = ({ openModal, onClose }: ICreateReview) => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [value, setValue] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [hover, setHover] = useState(-1);
  const { data, isLoading, isError } = useGetSingleBookingQuery(
    { userId: user?.user_id, hotelId: id },
    {
      skip: !user?.user_id || !id,
    }
  );

  const [createReview, { isLoading: createReviewIsLoading }] =
    useCreateReviewMutation();

  const handleSubmit = () => {
    console.log(value, reviewText);
    const checkInDate = new Date(data?.check_in);
    const checkOutDate = new Date(data?.check_out);

    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    console.log(user?.user_id);
    console.log(id);
    if (value && reviewText.length) {
      createReview({
        user: user?.user_id,
        hotel: id,
        score: value,
        room: data?.rooms[0].room,
        review: reviewText,
        stay_duration: numberOfDays,
      }).then(() => onClose());
    }
  };

  return (
    <Modal open={openModal} onClose={onClose}>
      <Box sx={style}>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Rooms Stayed At:</Typography>
            <Typography variant="h6">Quantity</Typography>
          </Box>
          {data?.rooms?.map((room: any) => {
            return (
              <Box display="flex" justifyContent="space-between">
                <Typography>{room.room_type}</Typography>
                <Typography>{room.quantity}</Typography>
              </Box>
            );
          })}
        </Box>
        <Box display="flex">
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            max={10}
            getLabelText={(value) =>
              getBookingRating(value as number)?.toString() || ""
            }
            onChange={(event, newValue) => {
              setValue(newValue as number);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>
              {getBookingRating(hover !== -1 ? hover : value)}
            </Box>
          )}{" "}
        </Box>
        <TextField
          value={reviewText}
          sx={{
            width: "100%",
          }}
          onChange={(e) => setReviewText(e.target.value)}
          multiline
          rows={4}
        />
        <Button
          onClick={handleSubmit}
          sx={{ width: "30%", alignSelf: "flex-end" }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateReview;
