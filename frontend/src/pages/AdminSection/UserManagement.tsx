import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomersTable from "../../components/AdminComponents/Customers";
import Layout from "../../components/AdminComponents/Layout";
import Loading from "../../components/Loading";
import { useGetAllUsersQuery } from "../../store/api/authorization-api-slice";
import Search from "../../components/AdminComponents/Search";

let rowsPerPage = 10;
const UserManagement = () => {
  const handlePageChange = (page: number) => {
    console.log(page);
    setPage(page);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [apiSearchQuery, setApiSearchQuery] = useState("");

  const [page, setPage] = useState(0);

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useGetAllUsersQuery({
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

  if (userIsLoading) return <Loading />;

  if (userIsError) return <div>Failed to load</div>;

  return (
    <Layout>
      <Stack direction="row" width="100%" alignItems="center">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Search
            handleSearch={handleSearch}
            placeholder="Search for email, name"
          />
          {userData && (
            <CustomersTable
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              page={page}
              count={userData.count}
              items={userData}
              loading={userIsLoading}
            />
          )}
        </Container>
      </Stack>
    </Layout>
  );
};

export default UserManagement;
