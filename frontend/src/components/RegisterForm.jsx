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
import passwordStrengthService from "../services/passwordStrengthService";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("success");
  const [passwordStrength, setPasswordStrength] = useState("");

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await usersServerCall.registerUser(
      username,
      email,
      password
    );

    if (result.message) {
      setSnackbarVariant("error");
      setSnackbarMessage("Error registering user");
    } else {
      setSnackbarVariant("success");
      setSnackbarMessage("User registered successfully");

      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 1500);
    }
    setSnackbarOpen(true);
  }

  function handlePasswordChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrength(
      passwordStrengthService.checkPasswordStrength(newPassword)
    );
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
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
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
              onChange={handlePasswordChange}
            />
            <Typography
              variant="body2"
              style={{
                color:
                  passwordStrengthService.getPasswordStrengthColor(
                    passwordStrength
                  ),
                marginTop: "8px",
              }}
            >
              {passwordStrength}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default RegisterForm;
