import { useEffect, useState } from "react";

import { Box, Typography, Link, IconButton } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

function Footer() {
  const [footerPosition, setFooterPosition] = useState("relative");

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const contentHeight = document.body.offsetHeight;
      const windowHeight = window.innerHeight;

      if (contentHeight < windowHeight) {
        setFooterPosition("fixed");
      } else {
        setFooterPosition("relative");
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box
      sx={{
        position: footerPosition,
        bottom: 0,
        width: "100%",
        mt: 4,
        py: 2,
        px: 2,
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link
          href="/"
          color="inherit"
          underline="none"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={"/img/logo.png"}
            alt="Fit Planner Logo"
            style={{ height: 50, marginRight: 8 }}
          />
          <Typography variant="body1" gutterBottom>
            Fit Planner
          </Typography>
        </Link>
      </Box>
      <Box>
        <IconButton
          component="a"
          href="https://github.com/baak93"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/bruno-alves-aragao/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedIn />
        </IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary">
        © 2024 Bruno Alves Aragão
      </Typography>
      <Typography variant="body2" color="textSecondary">
        All credits for the images used on this website belong to their original
        authors.
      </Typography>
    </Box>
  );
}

export default Footer;
