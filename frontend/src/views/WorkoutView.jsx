import { useState, useEffect } from "react";
import { Grid, Button, Container, Box, Snackbar } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";
import cookiesServerCall from "../services/cookiesServerCall";
import workoutServerCall from "../services/workoutsServerCall";

function WorkoutView() {
  const [workouts, setWorkouts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(function () {
    (async function () {
      try {
        const cookies = await cookiesServerCall.getCookies();
        const userLoggedIn = cookies.LoggedIn;
        if (!userLoggedIn) {
          throw new Error("Login required to fetch workouts");
        }
        const userDataObject = JSON.parse(userLoggedIn);
        const user_id = userDataObject.userID;

        const userWorkouts = await workoutServerCall.getWorkoutsByUserId(
          user_id
        );
        setWorkouts(userWorkouts);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const removeWorkout = (workoutIdToRemove) => {
    const updatedWorkouts = workouts.filter(
      (workout) => workout.id !== workoutIdToRemove
    );
    setWorkouts(updatedWorkouts);
  };

  const handleDeleteWorkout = (workoutId) => {
    removeWorkout(workoutId);
    setSnackbarMessage("Workout deleted successfully");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  function createWorkout() {
    window.location.href = "/createworkout";
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={3} justifyContent="center">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onRemove={handleDeleteWorkout}
          />
        ))}
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#ff2625", mb: 2 }}
          onClick={createWorkout}
        >
          Create a new workout
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default WorkoutView;
