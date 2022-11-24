import { useRef } from "react";
import { AppBar, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const pages = ["List your Property", "Login", "Register"];

enum Page {
  Home = "/",
  "List your Property" = "/add-property",
  Login = "/login",
  Register = "/register",
}
// enum which associates each page with their path

const PagesList = styled(Box)({
  display: "flex",
});

const NavBar = () => {
  const navRef = useRef<HTMLAnchorElement>(null);
  type pageStrings = keyof typeof Page;

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <h3>My App(LOGO)</h3>
        <PagesList>
          {pages.map((page) => (
            <Button key={page} variant="text">
              <NavLink
                ref={navRef}
                style={{ textDecoration: "none" }}
                to={`${Page[page as pageStrings]}`}
              >
                {page}
              </NavLink>
            </Button>
          ))}
        </PagesList>

        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
