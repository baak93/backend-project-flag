import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import cookiesServerCall from "../services/cookiesServerCall";
import workoutServerCall from "../services/workoutsServerCall"; // Importe a função postWorkout
import { useLocation } from "wouter";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useLocation();

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const cookies = await cookiesServerCall.getCookies();
      const userLoggedIn = cookies.LoggedIn;
      if (!userLoggedIn) {
        throw new Error("Login before creating a workout");
      }
      const userDataObject = JSON.parse(userLoggedIn);
      const user_id = userDataObject.userID;
      if (!title) {
        throw new Error("Missing workout title");
      }

      // Cria o objeto de dados a ser enviado para o backend
      const workoutData = {
        title,
        user_id,
      };

      const data = await workoutServerCall.postWorkout(workoutData); // Use a função postWorkout aqui
      console.log("Workout created:", data);
    } catch (error) {
      console.error(error);
    }

    setLocation("/workouts");
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        style={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" color="primary" type="submit">
        Create Workout
      </Button>
    </form>
  );
}

export default WorkoutForm;
