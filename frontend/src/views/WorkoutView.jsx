import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";
import cookiesServerCall from "../services/cookiesServerCall";
import workoutServerCall from "../services/workoutsServerCall";

function WorkoutView() {
  const [workouts, setWorkouts] = useState([]);

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

  function createWorkout() {
    window.location.href = "/createworkout";
  }

  return (
    <>
      <Grid container spacing={2}>
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
        <button onClick={createWorkout}>Create a new Workout</button>
      </Grid>
    </>
  );
}

export default WorkoutView;
