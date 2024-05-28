import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  Box,
  Typography,
} from "@mui/material";
import cookiesServerCall from "../services/cookiesServerCall";
import workoutServerCall from "../services/workoutsServerCall";
import { useLocation } from "wouter";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const cookies = await cookiesServerCall.getCookies();
      const userLoggedIn = cookies.LoggedIn;
      if (!userLoggedIn) {
        setVariant("error");
        setMessage("Please login before creating a workout");
        setOpen(true);
        return;
      }
      const userDataObject = JSON.parse(userLoggedIn);
      const user_id = userDataObject.userID;

      if (!title) {
        setVariant("error");
        setMessage("Missing workout title");
        setOpen(true);
        return;
      }

      // Cria o objeto de dados a ser enviado para o backend
      const workoutData = {
        title,
        user_id,
      };

      const data = await workoutServerCall.postWorkout(workoutData);
      console.log("Workout created:", data);
      setVariant("success");
      setMessage("Workout created successfully");
      setOpen(true);

      // Redireciona para a página de workouts após uma pequena demora para permitir que a mensagem seja exibida
      setTimeout(() => {
        setLocation("/workouts");
      }, 1500);
    } catch (error) {
      setVariant("error");
      setMessage("Error creating workout");
      setOpen(true);
      console.error(error);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <SnackbarContent
          style={{
            backgroundColor: variant === "error" ? "red" : "green",
          }}
          message={<span id="client-snackbar">{message}</span>}
        />
      </Snackbar>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" align="center">
          Create Workout
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleTitleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Create Workout
        </Button>
      </Box>
    </Container>
  );
}

export default WorkoutForm;
