import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import cookiesServerCall from "../services/cookiesServerCall";

const settings = ["Profile", "Settings", "Logout"];

function UserMenu() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(function () {
    (async function () {
      try {
        const cookies = await cookiesServerCall.getCookies();
        if (cookies.LoggedIn) {
          setLoggedIn(true);
          setUserData(JSON.parse(cookies.LoggedIn));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, []);

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  async function logout() {
    try {
      await cookiesServerCall.logout();
      setLoggedIn(false);
      setUserData(null);
      window.location.href = "/"; // Redirect to home or login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  function handleMenuItemClick(setting) {
    if (setting === "Logout") {
      logout();
    } else {
      handleCloseUserMenu();
      // Implement other settings actions here, if necessary
    }
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      {loggedIn ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ color: "#fff", marginRight: 1 }}>
              Welcome, {userData.username}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleMenuItemClick(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <>
          <Button
            href="/sign-in"
            variant="contained"
            size="medium"
            style={{ textDecoration: "none", backgroundColor: "#fff" }}
          >
            <span
              style={{ color: "#ff2625", padding: "0 12px", fontWeight: 700 }}
            >
              Sign-in
            </span>
          </Button>
          <Button href="/sign-up" style={{ textDecoration: "none" }}>
            <span style={{ color: "#fff", padding: "0 12px", fontWeight: 700 }}>
              Sign-up
            </span>
          </Button>
        </>
      )}
    </Box>
  );
}

export default UserMenu;
