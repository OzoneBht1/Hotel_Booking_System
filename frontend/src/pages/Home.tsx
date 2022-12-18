import { Alert, Box, Button, Card, Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HomepageImg from "../assets/homepage-img.jpg";
import { styled } from "@mui/system";

const Home = () => {
  const { state } = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(
    state?.open ? true : false
  );
  const [snackbarOpenOnLogout, setSnackbarOpenOnLogout] = useState<boolean>(
    state?.openOnLogout ? true : false
  );

  const StyledCard = styled(Box)({
    width: "60%",
    height: "350px",
    backgroundColor: "#fff",

    borderRadius: "10px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  });

  return (
    <div>
      {snackbarOpenOnLogout && (
        <Snackbar
          open={snackbarOpenOnLogout}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpenOnLogout(false)}
        >
          <Alert
            onClose={() => setSnackbarOpenOnLogout(false)}
            severity="info"
            sx={{ width: "100%" }}
          >
            Logged out successfully!
          </Alert>
        </Snackbar>
      )}
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Logged In!
          </Alert>
        </Snackbar>
      )}
      <Box height="320px" width="100%">
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          style={{
            backgroundImage: `url(${HomepageImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 60%",
            height: "100%",
            width: "100%",
          }}
        >
          <StyledCard style={{ position: "relative", bottom: "-60%" }}>
            {/* content goes here */}
          </StyledCard>
        </Box>
      </Box>

      <p>TESTINGTESTING</p>
    </div>
  );
};

export default Home;
