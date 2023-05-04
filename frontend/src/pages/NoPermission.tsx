import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function NoPermissionPage() {
  return (
    <Box>
      <Box
        component="img"
        src="https://example.com/image.png"
        alt="No permission"
      />
      <Typography variant="h4" align="center">
        Sorry, you don't have permission to access this page.
      </Typography>
    </Box>
  );
}

export default NoPermissionPage;
