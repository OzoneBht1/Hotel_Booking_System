enum BookingRating {
  "Terrible" = 1,
  "Very poor" = 2,
  "Poor" = 3,
  "Disappointing" = 4,
  "Okay" = 5,
  "Pleasant" = 6,
  "Good" = 7,
  "Very good" = 8,
  "Wonderful" = 9,
  "Exceptional" = 10,
}

const getBookingRating = (score: number): string | undefined => {
  return BookingRating[score];
};
export default getBookingRating;
