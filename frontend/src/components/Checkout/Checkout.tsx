import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useGetBookClickedHistoryQuery } from "../../store/api/bookingSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { useAppDispatch } from "../../store/hooks";
import { tempBookActions } from "../../store/tempBookSlice";
import { convertFormat } from "../../utils/RoomUtils";
import { ITempBookingModifiedFormat } from "../types/types";
import Bill from "./Bill";

const steps = ["Review", "Payment form", "Bill"];

const theme = createTheme();

interface ICheckout {
  data: {
    paymentIntentClientSecret: string;
  };
  booking: ITempBookingModifiedFormat;
}

let isInitial = true;
export default function Checkout({ data, booking }: ICheckout) {
  const [activeStep, setActiveStep] = React.useState(0);
  console.log(booking);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isInitial) {
      dispatch(tempBookActions.setTempBooking({ bookDetail: booking }));
    }
    isInitial = false;
  }, [dispatch, booking]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formReceiveHandler = (data: any) => {
    console.log("hi mom ");
    console.log(data);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <Review handleNext={handleNext} />;
      case 1:
        return (
          <PaymentForm
            handleNext={handleNext}
            data={data}
            onReceiveForm={formReceiveHandler}
          />
        );
      case 2:
        return <Bill secret={data.paymentIntentClientSecret} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shippe.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
