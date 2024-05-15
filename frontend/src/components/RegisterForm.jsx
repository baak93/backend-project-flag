import { useState, useRef } from "react";
import {
  Snackbar,
  IconButton,
  Input,
  Button,
  Card,
  CardContent,
  Typography,
  SnackbarContent,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import usersServerCall from "../services/usersServerCall";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("success"); // Nova variável para controlar a cor da Snackbar

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
      setSnackbarVariant("error"); // Define a cor como vermelho em caso de erro
      setSnackbarMessage("Error registering user");
    } else {
      setSnackbarVariant("success"); // Define a cor como verde em caso de sucesso
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
      >
        <SnackbarContent
          style={{
            backgroundColor: snackbarVariant === "error" ? "red" : "green", // Define a cor com base na variável snackbarVariant
          }}
          message={<span id="client-snackbar">{snackbarMessage}</span>}
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
      </Snackbar>
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
