import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box display="flex">
      <CssBaseline />
      <Topbar open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Box width="100%" display="flex" marginTop={9}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
