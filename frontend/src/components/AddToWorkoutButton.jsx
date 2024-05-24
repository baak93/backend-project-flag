import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "wouter";
import cookiesServerCall from "../services/cookiesServerCall";
import workoutsServerCall from "../services/workoutsServerCall";

function AddToWorkoutButton({ exercise }) {
  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [workouts, setWorkouts] = useState([]);

  async function handleClickOpen() {
    try {
      const cookies = await cookiesServerCall.getCookies();
      const userLoggedIn = cookies.LoggedIn;
      if (!userLoggedIn) {
        throw new Error("Login required to fetch workouts");
      }
      const userDataObject = JSON.parse(userLoggedIn);
      const user_id = userDataObject.userID;

      const userWorkouts = await workoutsServerCall.getWorkoutsByUserId(
        user_id
      );
      setWorkouts(userWorkouts);
    } catch (error) {
      console.error(error);
    }
    setOpen(true);
    console.log("workouts", workouts);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleAddRoutine() {
    if (selectedWorkout) {
      try {
        await workoutsServerCall.postExerciseIntoWorkout(
          selectedWorkout,
          exercise.id
        );
        console.log("Exercício adicionado à rotina:", selectedWorkout);
        setOpen(false);
      } catch (error) {
        console.error("Erro ao adicionar exercício à rotina", error);
      }
    }
  }

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ backgroundColor: "#ff2625" }}
        onClick={handleClickOpen}
      >
        Add to my workout
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select or Create Routine</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Existing Routine"
            value={selectedWorkout} //workoutID
            onChange={(e) => setSelectedWorkout(e.target.value)}
            fullWidth
            margin="normal"
          >
            {workouts.map((workout) => (
              <MenuItem key={workout.id} value={workout.id}>
                {workout.title}
              </MenuItem>
            ))}
          </TextField>
          <Typography align="center" variant="body2" sx={{ my: 2 }}>
            OR
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            href="/createworkout"
          >
            New Workout
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRoutine} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddToWorkoutButton;
