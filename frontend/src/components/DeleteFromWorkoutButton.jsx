import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation } from "wouter";
import workoutServerCall from "../services/workoutsServerCall";

function DeleteExerciseFromWorkoutButton({ exercise }) {
  const [location] = useLocation();
  const [workoutID, setWorkoutID] = useState(null);
  const [open, setOpen] = useState(false);

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
        setOpen(false); // Fecha o diálogo após a remoção
      } catch (error) {
        console.error("Erro ao remover exercício do workout", error);
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ backgroundColor: "#ff2625" }}
        onClick={handleClickOpen}
      >
        Remove from my workout
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this exercise from your workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteExercise} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteExerciseFromWorkoutButton;
