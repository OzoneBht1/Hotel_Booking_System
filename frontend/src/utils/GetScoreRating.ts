type BookingRatingType = {
  [key: string]: string;
};

const BookingRating: BookingRatingType = {
  "1": "Terrible",
  "2": "Very poor",
  "3": "Poor",
  "4": "Disappointing",
  "5": "Okay",
  "6": "Pleasant",
  "7": "Good",
  "8": "Very good",
  "9": "Wonderful",
  "10": "Exceptional",
};

const getBookingRating = (score: number): string | undefined => {
  return BookingRating[score.toString().split(".")[0]];
};
export default getBookingRating;
