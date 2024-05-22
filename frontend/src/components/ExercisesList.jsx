import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import exercisesServerCall from "../services/exercisesServerCall";
import ExerciseCard from "./ExerciseCard";
import { useLocation } from "wouter";

function ExercisesView() {
  const [exercises, setExercises] = useState([]);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    (async function () {
      const params = new URLSearchParams(window.location.search);
      const muscle = params.get("muscle");
      const difficulty = params.get("difficulty");
      const search = params.get("search");

      if (muscle && difficulty) {
        const results = await exercisesServerCall.getExercisesByFilters(
          muscle,
          difficulty
        );
        setExercises(results);
      } else if (muscle) {
        const results = await exercisesServerCall.getExercisesByMuscle(muscle);
        setExercises(results);
      } else if (difficulty) {
        const results = await exercisesServerCall.getExercisesByDifficulty(
          difficulty
        );
        setExercises(results);
      } else if (search) {
        const results = await exercisesServerCall.getExercisesBySearch(search);
        setExercises(results);
      } else {
        const results = await exercisesServerCall.getAllExercises();
        setExercises(results);
      }
    })();
  }, [location]);

  return (
    <Box sx={{ padding: "16px" }}>
      <Grid container spacing={3} justifyContent="center">
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ExercisesView;
