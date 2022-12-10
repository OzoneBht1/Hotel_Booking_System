import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(
    state ? true : false
  );
  return (
    <div>
      Home
      <div>
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
      </div>
      )
    </div>
  );
};

export default Home;
