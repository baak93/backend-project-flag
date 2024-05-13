import { useState, useRef } from "react";
import {
  Snackbar,
  IconButton,
  Input,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import usersServerCall from "../services/usersServerCall";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await usersServerCall.registerUser(
      username,
      email,
      password
    );
    console.log(result);

    if (result.message) {
      setSnackbarMessage("Error registering user");
    } else {
      setSnackbarMessage("User registered successfully");
    }
    setSnackbarOpen(true);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <form onSubmit={handleSubmit}>
        <Card variant="outlined" sx={{ p: 2, mt: 3 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Register
            </Typography>
            <Input
              placeholder="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Input
              placeholder="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Input
              type="password"
              placeholder="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}

export default RegisterForm;
