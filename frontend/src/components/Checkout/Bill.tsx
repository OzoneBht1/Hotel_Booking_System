import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRetrievePaymentQuery } from "../../store/api/payment-slice";
import { useAppSelector } from "../../store/hooks";
import DocumentCheckImage from "/postPaymentImg.jpg";
import { ITempBookingModifiedFormat } from "../types/types";

interface IBillProps {
  secret: string;
}

const Bill = ({ secret }: IBillProps) => {
  const { paymentIntentId } = useAppSelector((state) => state.paymentRed);
  const { bookDetail } = useAppSelector((state) => state.tempBook);
  const nav = useNavigate();
  console.log(secret);
  console.log(bookDetail);
  const { data, isLoading, isError } = useRetrievePaymentQuery(
    {
      secret: paymentIntentId as string,
      data: bookDetail as ITempBookingModifiedFormat,
    },
    {
      skip: !paymentIntentId || !bookDetail,
    }
  );
  console.log(data);

  return (
    <Stack alignItems="center">
      <Typography fontSize={16} variant="h5"></Typography>
      <Box
        sx={{ width: 275, height: 250, border: "none" }}
        component="img"
        src={DocumentCheckImage}
      ></Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography fontSize={16} variant="h6">
          Your payment was successful. Thank you for choosing us!
        </Typography>
        <Typography>The receipt has been sent to your email.</Typography>
      </Box>
      <Box display="flex" width="90%" marginTop={2} justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => nav("/")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          Back to Home
        </Button>
      </Box>
    </Stack>
  );
};

export default Bill;
