import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { FitnessCenter as FitnessCenterIcon } from "@mui/icons-material";
import NavigationMenu from "./NavigationMenu";
import UserMenu from "./UserMenu";

function Header() {
  return (
    <AppBar position="sticky" color="error" sx={{ backgroundColor: "#ff2625" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitnessCenterIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FitPlanner
          </Typography>

          <NavigationMenu />

          <FitnessCenterIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FitPlanner
          </Typography>

          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
