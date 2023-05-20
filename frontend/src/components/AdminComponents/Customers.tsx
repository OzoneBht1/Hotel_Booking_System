import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Card,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Modal,
  OutlinedInput,
  Snackbar,
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
import { ICountryData, IPaginated, ISelect, IUserData } from "../types/types";
import {
  useSendResetMutation,
  useUpdateProfileMutation,
} from "../../store/api/authorization-api-slice";
import UserProfile from "../UserProfile";
import { getCountries } from "../api/getCountries";
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
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [countries, setCountries] = useState<ISelect[]>([]);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");
  const [updateProfile] = useUpdateProfileMutation();

  const fetchCountries = useCallback(async () => {
    const returnedData = await getCountries<ICountryData[]>();
    const transformedCountries: ISelect[] = [];

    returnedData.map((country) => {
      transformedCountries.push({
        value: country.name,
        label: country.name,
      });
    });
    setCountries(transformedCountries);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const [sendReset] = useSendResetMutation();
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: IUserData
  ) => {
    setAnchorEl(event.currentTarget);
    setId(data.id as number);
    setUserData(data);
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
    setId(null);
  };

  const handleUpdateProfile = () => {
    setOpenUpdateProfile(true);
    setAnchorEl(null);
  };

  const updateHandler = (data: any) => {
    const first_name = data.firstName;
    const last_name = data.lastName;

    delete data.email;
    delete data.firstName;
    delete data.lastName;

    console.log(data);

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("gender", data.gender);
    formData.append("country", data.country);
    if (data.image) {
      formData.append("image", data.image, data.image.name);
    }

    updateProfile({ formData, id: id }).then(() => {
      setShowSnackbar(true);
      setMessage("Profile updated successfully");
    });
    setOpenUpdateProfile(false);
    setId(null);
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
                      onClick={(e) => handleClick(e, customer as IUserData)}
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
      {openUpdateProfile && countries && userData && (
        <Modal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openUpdateProfile}
          onClose={() => setOpenUpdateProfile(false)}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="80%"
            sx={{
              backgroundColor: "white",
              gap: 3,
              padding: 10,
            }}
          >
            <UserProfile
              data={userData}
              onSubmitForm={updateHandler}
              countries={countries}
            />
          </Box>
        </Modal>
      )}
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
