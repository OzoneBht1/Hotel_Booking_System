import { Alert, Box, Button, Card, Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomepageImg from "../assets/homepage-img.jpg";
import { styled } from "@mui/system";
import HomePageCard from "../components/HomePageCard";

const Home = () => {
  const { state } = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(
    state?.open ? true : false
  );
  const [snackbarOpenOnLogout, setSnackbarOpenOnLogout] = useState<boolean>(
    state?.openOnLogout ? true : false
  );
  useEffect(() => {
    setSnackbarOpenOnLogout(state?.openOnLogout ? true : false);
    // handling the case when user logs out from home page, as page isnt re-rendered
  }, [state]);

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
          <HomePageCard />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
