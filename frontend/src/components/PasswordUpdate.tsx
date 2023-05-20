import { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdatePasswordMutation } from "../store/api/authorization-api-slice";
import { useAppSelector } from "../store/hooks";

const passwordUpdateSchema = yup.object().shape({
  old_password: yup.string().required("Old password is required"),
  new_password: yup
    .string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters long"),
  password2: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
});

export const PasswordUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordUpdateSchema) });

  const [updatePassword] = useUpdatePasswordMutation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  const onSubmit = (data: any) => {
    updatePassword({ ...data, id: user?.user_id.toString() })
      .then((res) => {
        console.log(res);
        if ("error" in res) {
          throw new Error(res.error.data.non_field_errors[0]);
        }
        setOpen(true);
        setMessage("Password Updated Successfully");
        setSeverity("success");
      })
      .catch((err) => {
        console.log(err, typeof err);
        setOpen(true);
        setMessage(err.toString());
        setSeverity("error");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={severity}
            elevation={6}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              error={errors.old_password ? true : false}
              helperText={
                errors.old_password
                  ? (errors.old_password?.message as string)
                  : ""
              }
              {...register("old_password")}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              error={errors.new_password ? true : false}
              helperText={(errors.new_password?.message as string) || ""}
              {...register("new_password")}
            />
            <TextField
              fullWidth
              label="Retype New Password"
              type="password"
              error={errors.password2 ? true : false}
              helperText={(errors.password2?.message as string) || ""}
              {...register("password2")}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
