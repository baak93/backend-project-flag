import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import exercisesServerCall from "../services/exercisesServerCall";
import ExerciseCard from "./ExerciseCard";

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(function () {
    (async function () {
      const results = await exercisesServerCall.getAllExercises();
      setExercises(results);
    })();
  }, []);

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

export default ExercisesList;
