import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  Grid,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import usersServerCall from "../services/usersServerCall";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("success");

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await usersServerCall.loginUser(email, password);
    console.log(result);

    if (result.status !== "success") {
      setSnackbarVariant("error");
      setSnackbarMessage("Error trying to login");
    } else {
      setSnackbarVariant("success");
      setSnackbarMessage("Vai para a Página Pessoal");
    }

    setSnackbarOpen(true);
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: snackbarVariant === "error" ? "red" : "green",
          }}
          message={<span id="client-snackbar">{snackbarMessage}</span>}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign-in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default LoginForm;
