import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Checkbox,
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

export const CustomersTable = (props: any) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

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
            {items.map((customer: any) => {
              const isSelected = selected.includes(customer.id);
              const createdAt = customer.createdAt;

              return (
                <TableRow hover key={customer.id} selected={isSelected}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Avatar src={customer.avatar} />

                      <Typography variant="subtitle2">
                        {customer.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {customer.address.city}, {customer.address.state},{" "}
                    {customer.address.country}
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{createdAt}</TableCell>
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
        onPageChange={onPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

export default CustomersTable;
