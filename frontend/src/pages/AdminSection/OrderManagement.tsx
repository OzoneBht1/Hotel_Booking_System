import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomersTable from "../../components/AdminComponents/Customers";
import Layout from "../../components/AdminComponents/Layout";
import Loading from "../../components/Loading";
import { useGetAllUsersQuery } from "../../store/api/authorization-api-slice";
import Search from "../../components/AdminComponents/Search";
import { useGetAllBookingsQuery } from "../../store/api/bookingSlice";
import BookingTable from "../../components/BookingTable";

let rowsPerPage = 10;
const OrderManagement = () => {
  const handlePageChange = (page: number) => {
    console.log(page);
    setPage(page);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [apiSearchQuery, setApiSearchQuery] = useState("");

  const [page, setPage] = useState(0);

  const {
    data: bookingData,
    isLoading: bookingDataIsLoading,
    isError: bookingDataIsError,
  } = useGetAllBookingsQuery({
    page: page,
    search: apiSearchQuery,
    limit: rowsPerPage,
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

  if (bookingDataIsLoading) return <Loading />;

  if (bookingDataIsError) return <div>Failed to load</div>;

  return (
    <Layout>
      <Stack direction="row" width="100%" alignItems="center">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Search
            handleSearch={handleSearch}
            placeholder="Search for email, name"
          />
          {bookingData && (
            <BookingTable
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              page={page}
              count={bookingData.count}
              items={bookingData}
              loading={bookingDataIsLoading}
            />
          )}
        </Container>
      </Stack>
    </Layout>
  );
};

export default OrderManagement;
