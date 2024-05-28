import { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import exercisesServerCalls from "../services/exercisesServerCall";
import ExerciseCard from "./ExerciseCard";
import workoutServerCall from "../services/workoutsServerCall";

function WorkoutDetail({ id }) {
  const [exercises, setExercises] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchWorkoutDetails() {
      try {
        const results = await exercisesServerCalls.getExercisesByWorkoutId(id);
        setExercises(results[0]);

        const workoutDetails = await workoutServerCall.getWorkoutById(id);
        setTitle(workoutDetails.title);
      } catch (error) {
        console.error("Error fetching workout details:", error);
      }
    }

    fetchWorkoutDetails();
  }, [id]);

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
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default WorkoutDetail;
