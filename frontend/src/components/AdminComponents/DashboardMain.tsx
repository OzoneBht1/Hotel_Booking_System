import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/system/Container";
import LatestSale from "./LatestSale";
import OrderHistory from "./OrderHistory";
import SaleToday from "./SaleToday";

const DashboardMain = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <SaleToday />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <LatestSale />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <OrderHistory />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default DashboardMain;
