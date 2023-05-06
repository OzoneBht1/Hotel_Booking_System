import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../../components/AdminComponents/Layout";
import Loading from "../../components/Loading";
import Search from "../../components/AdminComponents/Search";
import { useGetAllHotelsQuery } from "../../store/api/hotelSlice";
import HotelTable from "../../components/AdminComponents/HotelTable";

let rowsPerPage = 10;
const HotelManagement = () => {
  const handlePageChange = (page: number) => {
    console.log(page);
    setPage(page);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [apiSearchQuery, setApiSearchQuery] = useState("");

  const [page, setPage] = useState(0);

  const {
    data: hotelData,
    isLoading: hotelIsLoading,
    isError: hotelIsError,
  } = useGetAllHotelsQuery({
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

  if (hotelIsLoading) return <Loading />;

  if (hotelIsError) return <div>Failed to load</div>;

  return (
    <Layout>
      <Stack direction="row" width="100%" alignItems="center">
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Search handleSearch={handleSearch} />
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
