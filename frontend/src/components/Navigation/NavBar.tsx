import React, { useState } from "react";
import { AppBar, Button, Drawer, List, ListItem, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const pages = ["List your Property", "Support", "Login", "Register"];

enum Page {
  Home = "/",
  "List your Property" = "/add-property",
  Support = "support",
  Login = "/login",
  Register = "/register",
}
// enum which associates each page with their path

const NavBar = () => {
  const [open, setOpen] = useState(false);
  // state to control the menu

  type pageStrings = keyof typeof Page;

  return (
    <AppBar position="sticky" sx={{ background: "#063970" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: {
            xs: "space-between",
            md: "space-around",
            lg: "space-around",
          },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <HomeIcon sx={{ color: "white", width: 30, height: 30 }} />
          <Typography
            variant="h6"
            component={NavLink}
            to={Page.Home}
            sx={{
              flexGrow: 1,
              color: "white",
              textDecoration: "none",
              display: { md: "block", xs: "none" },
              "&.active": {
                color: "white",
                fontWeight: 600,
              },
            }}
          >
            HBS
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {pages.map((page) => (
            <Button
              to={`${Page[page as pageStrings]}`}
              key={page}
              variant="text"
              color="inherit"
              component={NavLink}
              sx={{
                color: "white",
                "&.active": {
                  color: "white",
                  fontWeight: 600,
                  borderBottom: "2px solid orange",
                },
              }}
            >
              {page}
            </Button>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon
            sx={{ width: 30, height: 30 }}
            onClick={() => setOpen(true)}
          />

          <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
            <List>
              {pages.map((page) => (
                <ListItem
                  to={`${Page[page as pageStrings]}`}
                  key={page}
                  color="inherit"
                  component={NavLink}
                >
                  {page}
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
