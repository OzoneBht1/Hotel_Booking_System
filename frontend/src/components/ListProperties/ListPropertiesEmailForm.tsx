import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useUserDetailQuery } from "../../store/api/authorization-api-slice";
import Loading from "../Loading";
import Error from "../../pages/404";
import { listActions } from "../../store/list-slice";

interface IListPropertiesEmailFormProps {
  onClickNext: () => void;
}

const ListPropertiesEmailForm = ({
  onClickNext,
}: IListPropertiesEmailFormProps) => {
  const userId = useAppSelector((state) => state.auth.user?.user_id);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useUserDetailQuery(userId as number);

  const onClickNextHandler = () => {
    dispatch(listActions.setEmail({ email: data!.email }));
    onClickNext();
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Partner Email
        </Typography>
        <Box component={"form"}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            value={data?.email}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "grey",
                fontWeight: "500",
              },
            }}
            disabled
          />
          <Typography variant="caption" fontSize={13}>
            Disclaimer : The account you are signed in with will be used to
            associate the hotels. Please create and login with a different
            account if required.
          </Typography>
          <Button
            onClick={onClickNextHandler}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ListPropertiesEmailForm;
