import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./ListItems";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { authActions } from "../../store/auth-slice";
import { useLogoutUserMutation } from "../../store/api/authentication-api-slice";
import LogoutIcon from "@mui/icons-material/Logout";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    // position: "absolute",

    whiteSpace: "nowrap",
    width: 240,
    height: "100vh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface ISidebarProps {
  open: boolean;
  toggleDrawer: () => void;
}

const Sidebar = ({ open, toggleDrawer }: ISidebarProps) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutUserMutation();

  const logoutHandler = async () => {
    dispatch(authActions.logOut());

    await logout()
      .unwrap()
      .then(() => {
        nav("/", { state: { openOnLogout: true }, replace: true });
      });
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
        <ListItemButton onClick={logoutHandler}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
export default Sidebar;
