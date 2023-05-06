import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CustomersTable, {
  CustomersSearch,
} from "../../components/AdminComponents/Customers";
import DashboardMain from "../../components/AdminComponents/DashboardMain";
import Layout from "../../components/AdminComponents/Layout";
import Loading from "../../components/Loading";
import { useGetAllUsersQuery } from "../../store/api/authorization-api-slice";

let rowsPerPage = 10;
const UserManagement = () => {
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const [page, setPage] = useState(1);

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useGetAllUsersQuery({ page: page });

  if (userIsLoading) return <Loading />;

  if (userIsError) return <div>Failed to load</div>;
  return (
    <Layout>
      <Stack direction="row" width="100%" alignItems="center">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <CustomersSearch />
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
