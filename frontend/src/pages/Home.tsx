import { Alert, Box, Button, Card, Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomepageImg from "../assets/homepage-img.jpg";
import { styled } from "@mui/system";
import HomePageCard from "../components/HomePageCard";
import HomePageItems from "../components/HomePageItems";
import { IQuery, UserType } from "../components/types/types";
import { useAppSelector } from "../store/hooks";

const Home = () => {
  const { state } = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(
    state?.open ? true : false
  );
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const nav = useNavigate();
  const [snackbarOpenOnLogout, setSnackbarOpenOnLogout] = useState<boolean>(
    state?.openOnLogout ? true : false
  );
  useEffect(() => {
    setSnackbarOpenOnLogout(state?.openOnLogout ? true : false);
    // handling the case when user logs out from home page, as page isnt re-rendered
  }, [state]);

  const searchHandler = (searchQuery: IQuery) => {
    nav(
      `/hotels/find?term=${searchQuery.searchQuery}&checkInDate=${searchQuery.checkInDate}&checkOutDate=${searchQuery.checkOutDate}&rooms=${searchQuery.room_count}`
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setSnackbarOpen(false);
      setSnackbarOpenOnLogout(false);
    }, 6000);
  });

  return (
    <>
      {snackbarOpenOnLogout && (
        <Snackbar
          open={snackbarOpenOnLogout}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpenOnLogout(false)}
        >
          <Alert
            onClose={() => setSnackbarOpenOnLogout(false)}
            elevation={6}
            variant="filled"
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
            elevation={6}
            variant="filled"
            sx={{ width: "100%" }}
          >
            Successfully Logged In!
          </Alert>
        </Snackbar>
      )}
      {user && user.user_type === UserType.ADMIN && (
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button
            color="success"
            onClick={() => nav("/dashboard")}
            variant="contained"
          >
            Back to Admin Panel
          </Button>
        </Box>
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
          <HomePageCard onSearch={searchHandler} />
        </Box>
        <HomePageItems />
      </Box>
    </>
  );
};

export default Home;
