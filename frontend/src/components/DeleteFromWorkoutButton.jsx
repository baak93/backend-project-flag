import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import workoutServerCall from "../services/workoutsServerCall";

function DeleteExerciseFromWorkoutButton({ exercise, onRemove, workoutId }) {
  const [open, setOpen] = useState(false);

  async function handleDeleteExercise() {
    if (workoutId) {
      try {
        await workoutServerCall.deleteExerciseFromWorkout(
          exercise.id,
          workoutId
        );
        console.log("Exercise removed from workout.");
        setOpen(false);
        onRemove(exercise.id);
      } catch (error) {
        console.error("Error trying to remove exercise from workout.", error);
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
