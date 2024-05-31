import { Container, Box, Typography, Button } from "@mui/material";
import { useLocation, Link } from "wouter";

function PageNotFound() {
  const [, navigate] = useLocation();

  return (
    <Container maxWidth="lg" sx={{ mt: 5, textAlign: "center" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mb={4}
        mt={4}
      >
        <Typography variant="h1" component="div" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          I'm sorry, but the page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
      </Box>
    </Container>
  );
}

export default PageNotFound;
