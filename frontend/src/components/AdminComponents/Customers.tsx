import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
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

export const CustomersSearch = () => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search customer"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <SearchIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);

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
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
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
                  <TableCell>{customer.user_type}</TableCell>
                  <TableCell>{customer.is_superuser}</TableCell>
                  <TableCell>
                    <MoreVert />
                  </TableCell>
                </TableRow>
              );
            })}
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
