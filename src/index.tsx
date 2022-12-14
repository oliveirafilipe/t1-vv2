import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import User from "./application/pages/User";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Person,
  LocalShipping,
  Apartment,
  People,
  AutoStories,
  Assessment,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import Home from "./application/pages/Home";
import Operators from "./application/pages/Operators";
import Deliveries from "./application/pages/Deliveries";
import Residents from "./application/pages/Residents";
import Withdrawals from "./application/pages/Withdrawals";
import database from "./external/database";
import "./application/styles/index.css";
import Dashboard from "./application/pages/Dashboard";
import seed from "./application/seed";

const drawerWidth = 240;

interface MenuOption {
  key: string;
  title: string;
  route: string;
  icon: any;
  component: () => JSX.Element;
}

const menu: MenuOption[] = [
  {
    key: "Home",
    title: "Home",
    route: "/",
    icon: HomeIcon,
    component: Home,
  },
  {
    key: "User",
    title: "Usuário",
    route: "/user",
    icon: Person,
    component: User,
  },
  {
    key: "Operators",
    title: "Operadores",
    route: "/operators",
    icon: People,
    component: Operators,
  },
  {
    key: "Deliveries",
    title: "Entregas",
    route: "/deliveries",
    icon: LocalShipping,
    component: Deliveries,
  },
  {
    key: "Residents",
    title: "Moradores",
    route: "/residents",
    icon: Apartment,
    component: Residents,
  },
  {
    key: "Withdrawals",
    title: "Retiradas",
    route: "/withdrawals",
    icon: AutoStories,
    component: Withdrawals,
  },
  {
    key: "Dashboard",
    title: "Dashboard",
    route: "/dashboard",
    icon: Assessment,
    component: Dashboard,
  },
];

const APPLY_SEED = false;

export default function ResponsiveDrawer(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const whenDatabaseLoaded = () => {
    if (APPLY_SEED) {
      seed();
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    database.loadDatabase({}, (err) =>
      err ? console.log(err) : whenDatabaseLoaded()
    );
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Object.entries(menu).map(([_, menuOption]) => (
          <ListItem key={menuOption.key} component={Link} to={menuOption.route}>
            <ListItemIcon>{React.createElement(menuOption.icon)}</ListItemIcon>
            <ListItemText primary={menuOption.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && (
        <Router>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Controlador de Entregas
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              <Toolbar />
              <Routes>
                {Object.entries(menu).map(([_, menuOption]) => (
                  <Route
                    key={menuOption.key}
                    path={menuOption.route}
                    element={React.createElement(menuOption.component)}
                  />
                ))}
              </Routes>
            </Box>
          </Box>
        </Router>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResponsiveDrawer />
  </React.StrictMode>
);
