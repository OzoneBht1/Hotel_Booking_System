import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { amenitiesMap } from "../icons/Icons";
import { listActions } from "../../store/list-slice";
import { fontWeight } from "@mui/system";

interface IListPropertiesAmenitiesProps {
  onClickNext: () => void;
}

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  gap: 1,
  color: theme.palette.text.secondary,
}));

const FaqAndCleanPractices = ({
  onClickNext,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const smokingAllowedRef = useRef<HTMLInputElement | null>(null);
  const petsAllowedRef = useRef<HTMLInputElement | null>(null);
  const childrenAllowed = useRef<HTMLInputElement | null>(null);
  const partiesAllowedRef = useRef<HTMLInputElement | null>(null);

  const nextClickHandler = () => {
    onClickNext();
  };
  return (
    <Container component="main">
      {error && showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}

      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 5,
        }}
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h5" component="h2">
            House Rules
          </Typography>
          <List>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Smoking allowed</Typography>
                <Switch inputRef={smokingAllowedRef} />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Smoking allowed</Typography>
                <Switch inputRef={smokingAllowedRef} />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Pets allowed</Typography>
                <Switch inputRef={childrenAllowed} />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="35%"
              >
                <Typography variant="body1">Parties/Events Allowed</Typography>
                <Switch inputRef={partiesAllowedRef} />
              </Box>
            </ListItem>
          </List>
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          <Typography variant="h5" component="h2">
            Frequently Asked Questions
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              id="outlined-basic"
              label="Question 1"
              sx={{
                fontSize: 20,
                fontWeight: 800,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              multiline
              label="Answer"
              variant="outlined"
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              id="outlined-basic"
              label="Question 2"
              sx={{
                fontSize: 20,
                fontWeight: 800,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              multiline
              label="Answer"
              variant="outlined"
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              id="outlined-basic"
              label="Question 3"
              sx={{
                fontSize: 20,
                fontWeight: 800,
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              multiline
              label="Answer"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            id="outlined-basic"
            label="Question 4"
            sx={{
              fontSize: 20,
              fontWeight: 800,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            multiline
            label="Answer"
            variant="outlined"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        width="100%"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Button
          sx={{ width: "20%", mt: 2 }}
          variant="contained"
          onClick={nextClickHandler}
          type="button"
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default FaqAndCleanPractices;
