import { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Chip } from "@mui/material";
import exercisesServerCalls from "../services/exercisesServerCall";
import ExerciseCard from "./ExerciseCard";
import workoutServerCall from "../services/workoutsServerCall";

function WorkoutDetail({ id }) {
  const [exercises, setExercises] = useState([]);
  const [title, setTitle] = useState("");
  const [workouts, setWorkouts] = useState([]);

  useEffect(
    function () {
      (async function () {
        try {
          const results = await exercisesServerCalls.getExercisesByWorkoutId(
            id
          );
          setExercises(results[0]);

          const workoutDetails = await workoutServerCall.getWorkoutById(id);
          setTitle(workoutDetails.title);

          const userWorkouts = await workoutServerCall.getWorkoutsByUserId(
            workoutDetails.user_id
          );
          setWorkouts(userWorkouts);
          console.log("userWorkouts", userWorkouts);
        } catch (error) {
          console.error("Error fetching workout details:", error);
        }
      })();
    },
    [id]
  );

  const removeExercise = (exerciseIdToRemove) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseIdToRemove
    );
    setExercises(updatedExercises);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mb={4}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {exercises.map((exercise, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <ExerciseCard
              exercise={exercise}
              onRemove={removeExercise}
              workoutId={id}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={1}
      >
        {workouts.map((workout) => (
          <Chip
            key={workout.id}
            label={workout.title}
            onClick={() =>
              (window.location.href = `/workoutdetail/${workout.id}`)
            }
            sx={{ cursor: "pointer", fontSize: "0.75rem" }}
          />
        ))}
      </Box>
    </Container>
  );
}

export default WorkoutDetail;
