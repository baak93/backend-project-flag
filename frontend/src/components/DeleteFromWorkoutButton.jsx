import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation } from "wouter";
import workoutServerCall from "../services/workoutsServerCall";

function DeleteExerciseFromWorkoutButton({ exercise }) {
  const [location] = useLocation();
  const [workoutID, setWorkoutID] = useState(null);

  useEffect(() => {
    const workoutIdFromUrl = location.split("/").pop();
    setWorkoutID(workoutIdFromUrl);
  }, [location]);

  async function handleDeleteExercise() {
    if (workoutID) {
      try {
        await workoutServerCall.deleteExerciseFromWorkout(
          exercise.id,
          workoutID
        );
        console.log("Exercício removido do workout:", workoutID);
      } catch (error) {
        console.error("Erro ao remover exercício do workout", error);
      }
    }
  }

  return (
    <Button
      variant="contained"
      size="small"
      color="error"
      sx={{ backgroundColor: "#ff2625" }}
      onClick={handleDeleteExercise}
    >
      Remove from my workout
    </Button>
  );
}

export default DeleteExerciseFromWorkoutButton;
