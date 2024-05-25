import { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  FitnessCenter as FitnessCenterIcon,
} from "@mui/icons-material";
import { Link } from "wouter";

const pages = ["Exercises", "Workouts", "Contacts"];

function NavigationMenu() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page, index) => (
            <MenuItem
              key={index}
              onClick={handleCloseNavMenu}
              component={Link}
              href={`/${page.toLowerCase()}`}
            >
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page, index) => (
          <Button
            key={index}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "#fff", display: "block" }}
            component={Link}
            href={`/${page.toLowerCase()}`}
          >
            <span style={{ fontWeight: 600 }}>{page}</span>
          </Button>
        ))}
      </Box>
    </>
  );
}

export default NavigationMenu;
