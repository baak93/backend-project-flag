import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import exercisesServerCalls from "../services/exercisesServerCall";
import ExerciseCard from "./ExerciseCard";

function WorkoutDetail({ id }) {
  const [exercises, setExercises] = useState([]);

  useEffect(
    function () {
      (async function () {
        const results = await exercisesServerCalls.getExercisesByWorkoutId(id);
        setExercises(results[0]);
      })();
    },
    [id]
  );

  console.log("exercises");
  console.log(exercises);

  return (
    <Grid container spacing={2}>
      {exercises.map((exercise, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <ExerciseCard exercise={exercise} />
        </Grid>
      ))}
    </Grid>
  );
}

export default WorkoutDetail;
