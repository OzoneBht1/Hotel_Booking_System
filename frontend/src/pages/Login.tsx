import {
  Avatar,
  Box,
  Snackbar,
  Alert,
  Grid,
  Stack,
  Modal,
} from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { ILoginCreds, UserType } from "../components/types/types";
import {
  useVerifyEmailMutation,
  useVerifyLoginMutation,
} from "../store/api/authentication-api-slice";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/auth-slice";
import { ITokenState } from "../components/types/types";
import { useLocation } from "react-router-dom";
import LoginPageIllustration from "../assets/LoginPageIllustration.png";
import VerifyEmail from "../components/VerifyEmail";
import jwtDecode from "jwt-decode";
import { IUserJwt } from "../components/types/types";

let HEIGHT_OF_NAVBAR = 68;

const Login = () => {
  const { state } = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(
    state?.from?.state ? true : false
  );

  const [verifyEmail, { isLoading: verificationApiIsLoading, isSuccess }] =
    useVerifyEmailMutation();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const [verifyLogin, { error, isLoading }] = useVerifyLoginMutation();
  const [emailVerified, setEmailVerified] = useState(true);
  let errorText: string | undefined = "";

  if (error) {
    // either FetchBaseQueryError or SerializedError
    if ("status" in error) {
      const { data } = error as { status: number; data: { email: string[] } };

      // FetchBaseQueryError
      if ("error" in error) {
        errorText =
          "There is a problem with the server. Please try again later.";
      } else if (data?.email?.[0] === "Email Not verified") {
        errorText = "Please verify your email before logging in.";
      } else {
        errorText = "Invalid Credentials";
      }
    } else {
      // SerializedError
      errorText = error.message;
    }
  }

  const loginDataHandler = (data: ILoginCreds) => {
    verifyLogin({ email: data.email, password: data.password })
      .unwrap()
      .then((tokens: ITokenState) => {
        dispatch(authActions.setCredentials({ authTokens: tokens }));
        if (
          (jwtDecode(tokens.access) as IUserJwt).user_type === UserType.ADMIN
        ) {
          nav("/dashboard", { state: { open: true } });
        } else {
          nav("/", { state: { open: true } });
        }
      })

      .catch((err: { status: number; data: { email: string[] } }) => {
        if (err.data.email[0] === "Email Not verified") {
          setShowModal(true);
          setEmailVerified(false);
          setEmail(data.email);
        }
        setOpen(true);
      });
  };

  const StyledBox = styled(Box)({
    marginTop: 65,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  const style = {
    position: "absolute" as "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    top: "40%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const codeReceiveHandler = (email: string, code: string) => {
    console.log(email, code);
    verifyEmail({ email, code })
      .unwrap()
      .then(() => {
        setEmailVerified(true);
        setShowModal(false);
        setSnackbarOpen(true);
      });
  };

  return (
    <Stack
      flexDirection="row"
      marginTop={-1}
      height={`calc(100vh - ${HEIGHT_OF_NAVBAR}px)`}
    >
      {!isSuccess && !emailVerified && !!email && (
        <Modal
          // sx={{ backgroundColor: "white" }}
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <Box {...style}>
            <Typography>Enter the code sent to your email </Typography>
            <VerifyEmail onCodeReceieve={codeReceiveHandler} email={email} />
          </Box>
        </Modal>
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
            Your account has been verified! You can now log in.
          </Alert>
        </Snackbar>
      )}
      {open && errorText != "" && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            elevation={6}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorText}
          </Alert>
        </Snackbar>
      )}
      <Stack
        component="main"
        width={{ xs: "100%", sm: "60%", md: "50%" }}
        padding={0}
      >
        <Stack height={"70vh"} width="100%">
          <StyledBox>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <LoginForm
              onReceiveData={loginDataHandler}
              isLoading={isLoading}
              errorText={
                errorText !== "" && errorText !== undefined ? errorText : ""
              }
            />
            <Typography margin={3}>
              Don't have an account?{" "}
              <Typography component={NavLink} to="/register">
                Register here.
              </Typography>
            </Typography>
          </StyledBox>
        </Stack>
      </Stack>

      <Stack
        component="aside"
        width="50%"
        sx={{
          backgroundImage: `url(${LoginPageIllustration})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Stack
          height="70vh"
          width="90%"
          alignContent={"center"}
          justifyContent={"center"}
        />
      </Stack>
    </Stack>
  );
};

export default Login;
