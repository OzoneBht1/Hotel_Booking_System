import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../../components/AdminComponents/Layout";
import Loading from "../../components/Loading";
import Search from "../../components/AdminComponents/Search";
import { useGetAllHotelsQuery } from "../../store/api/hotelSlice";
import HotelTable from "../../components/AdminComponents/HotelTable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/system";

let rowsPerPage = 10;
//
enum OrderOptions {
  Name = "name",
  Address = "address",
  Score = "hotel_score",
}

const HotelManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSearchQuery, setApiSearchQuery] = useState("");

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
    data: hotelData,
    isLoading: hotelIsLoading,
    isError: hotelIsError,
  } = useGetAllHotelsQuery({
    page: page,
    search: apiSearchQuery,
    limit: rowsPerPage,
    ordering: orderBy,
  });

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

  if (hotelIsLoading) return <Loading />;

  if (hotelIsError) return <div>Failed to load</div>;

  return (
    <Layout>
      <Stack direction="row" width="100%" alignItems="center">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Stack
            position="relative"
            direction="row"
            justifyContent="space-between"
          >
            <Box width="100%">
              <Search
                handleSearch={handleSearch}
                placeholder="Search for name, address.."
              />
            </Box>
            <Box>
              <Button
                sx={{
                  position: "absolute",
                  right: 15,
                  top: 25,
                }}
                variant="contained"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                size="large"

                // onClick={() => set
              >
                Order
              </Button>
            </Box>
          </Stack>
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
              {orderBy === OrderOptions.Address && (
                <CheckIcon color="primary" />
              )}
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
          {hotelData && (
            <HotelTable
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              page={page}
              count={hotelData.count}
              items={hotelData}
              loading={hotelIsLoading}
            />
          )}
        </Container>
      </Stack>
    </Layout>
  );
};

export default HotelManagement;
