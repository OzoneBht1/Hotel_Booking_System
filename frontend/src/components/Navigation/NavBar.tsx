import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import { user } from "../../store/hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styled } from "@mui/system";
import { createStyles, useTheme, withStyles } from "@mui/material/styles";
import travAlly from "../../assets/travAlly.png";
import { authActions } from "../../store/auth-slice";

const authenticatedPages = ["List your Property", "Support"];
const unauthenticatedPages = [
  "List your Property",
  "Support",
  "Login",
  "Register",
];

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
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  // state to control the menu
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const nav = useNavigate();

  type pageStrings = keyof typeof Page;
  const pagesToRender = user ? authenticatedPages : unauthenticatedPages;

  const logoutHandler = () => {
    dispatch(authActions.logOut());
    nav(Page.Home, { state: { openOnLogout: true } });
  };

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.bgColor.main,
  }));

  const navigationItems = (
    <Stack
      direction="row"
      spacing={{ sm: 1, md: 2 }}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      {pagesToRender.map((page) => (
        <Button
          to={`${Page[page as pageStrings]}`}
          key={page}
          variant="text"
          color="primary_btn"
          component={NavLink}
          sx={{
            "&.active": {
              color: theme.palette.primary.dark,
              fontWeight: 900,
            },
          }}
        >
          {page}
        </Button>
      ))}
      {user && (
        <Button variant="text" color="error" onClick={logoutHandler}>
          Logout
        </Button>
      )}
    </Stack>
  );

  const mobileNavigationDrawer = (
    <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
      <List>
        {pagesToRender.map((page) => (
          <ListItem
            to={`${Page[page as pageStrings]}`}
            key={page}
            color="primary_btn"
            component={NavLink}
          >
            {page}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const StyledMenuIcon = styled(MenuIcon)({
    color: theme.palette.primary.main,
  });

  return (
    <StyledAppBar position="sticky">
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
        <Stack direction="row" alignItems="center">
          <Box
            component={Link}
            sx={{
              background: `url(${travAlly})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: { sm: 140, md: 170, lg: 200 },
              height: 70,
            }}
            to={Page.Home}
            width={{ sm: 140, md: 170, lg: 200 }}
            height={70}
          />
        </Stack>
        {navigationItems}

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <StyledMenuIcon
            sx={{ width: 30, height: 30 }}
            onClick={() => setOpen(true)}
          />

          {mobileNavigationDrawer}
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
