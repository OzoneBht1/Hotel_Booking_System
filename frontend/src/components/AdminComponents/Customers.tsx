import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Card,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  MenuList,
  OutlinedInput,
  Snackbar,
  SvgIcon,
} from "@mui/material";
import {
  Avatar,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { IPaginated, IUserData } from "../types/types";
import { useSendResetMutation } from "../../store/api/authorization-api-slice";
interface ICustomersTableProps {
  count?: number;
  items: IPaginated<IUserData>;
  onPageChange: (page: number) => void;
  page?: number;
  rowsPerPage?: number;
  loading?: boolean;
  // selected?: any[];
  //
}

export const CustomersTable = (props: ICustomersTableProps) => {
  const { count = 0, items, page = 0, rowsPerPage = 0 } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");

  const [sendReset] = useSendResetMutation();
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };
  const handleSendReset = () => {
    sendReset(id)
      .then((res) => {
        if ("error" in res) {
          throw new Error();
        }
        setShowSnackbar(true);
        setSeverity("success");
        setMessage("The reset details was sent to the user");
      })
      .catch((_) => {
        setShowSnackbar(true);
        setSeverity("error");
        setMessage("Something went wrong");
      });

    setAnchorEl(null);
  };

  const handleUpdateProfile = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.onPageChange(newPage);
  };
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={() => setShowSnackbar(false)}
          >
            <Alert
              onClose={() => setShowSnackbar(false)}
              severity={severity}
              elevation={6}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.results?.map((customer) => {
              // const createdAt = customer.createdAt;

              return (
                <TableRow hover key={customer.id}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Avatar src={customer.image} />

                      <Typography variant="subtitle2">
                        {customer.first_name} {customer.last_name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.country}</TableCell>
                  <TableCell>{customer.gender}</TableCell>
                  <TableCell>{customer.user_type}</TableCell>
                  <TableCell>
                    {customer.is_active === true ? "Active" : "InActive"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleClick(e, customer.id as number)}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {open && (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleSendReset}>Reset Password</MenuItem>
                <MenuItem onClick={handleUpdateProfile}>Update</MenuItem>
              </Menu>
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        page={page}
        backIconButtonProps={
          props.loading
            ? {
                disabled: props.loading,
              }
            : undefined
        }
        nextIconButtonProps={
          props.loading
            ? {
                disabled: props.loading,
              }
            : undefined
        }
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
};

export default CustomersTable;
