import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useLocation();
  console.log(state.open);
  const [snackbarOpen, setSnackbarOpen] = useState(state.open);
  return (
    <div>
      Home
      {state && state.open && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default Home;
