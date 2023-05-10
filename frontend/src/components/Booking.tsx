import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
// import Search from "../../components/AdminComponents/Search";
// import HotelTable from "../../components/AdminComponents/HotelTable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/system";
import { useGetBookingsByUserQuery } from "../store/api/bookingSlice";
import { useAppSelector } from "../store/hooks";
import BookingTable from "./BookingTable";
import Search from "./AdminComponents/Search";

let rowsPerPage = 10;
//
enum OrderOptions {
  Name = "name",
  Address = "address",
  Score = "hotel_score",
}

const Booking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSearchQuery, setApiSearchQuery] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<OrderOptions>(OrderOptions.Name);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (page: number) => {
    console.log(page);
    setPage(page);
  };

  const handleOrderBy = (orderBy: OrderOptions) => {
    setOrderBy(orderBy);
  };

  const {
    data: userData,
    isLoading: userDataIsLoading,
    isError: userDataIsError,
  } = useGetBookingsByUserQuery(
    {
      user_id: user?.user_id,
      page: page,
      search: apiSearchQuery,
      limit: rowsPerPage,
      ordering: orderBy,
    },
    {
      skip: !user?.user_id,
    }
  );

  const handleSearch = (search: string) => {
    setSearchTerm(search);

    setPage(0);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setApiSearchQuery(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  if (userDataIsLoading) return <Loading />;

  if (userDataIsError) return <div>Failed to load</div>;

  return (
    <Stack direction="row" width="100%" alignItems="center">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Search
          handleSearch={handleSearch}
          placeholder="Search for hotel, room name..."
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleOrderBy(OrderOptions.Name);
              handleClose();
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              Name
              {orderBy === OrderOptions.Name && <CheckIcon color="primary" />}
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleOrderBy(OrderOptions.Address);
              handleClose();
            }}
          >
            Address
            {orderBy === OrderOptions.Address && <CheckIcon color="primary" />}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleOrderBy(OrderOptions.Score);
              handleClose();
            }}
          >
            Score
            {orderBy === OrderOptions.Score && <CheckIcon color="primary" />}
          </MenuItem>
        </Menu>
        {userData && (
          <BookingTable
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            page={page}
            count={userData.count}
            items={userData}
            loading={userDataIsLoading}
          />
        )}
      </Container>
    </Stack>
  );
};

export default Booking;
