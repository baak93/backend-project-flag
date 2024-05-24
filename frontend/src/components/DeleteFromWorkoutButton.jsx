// import { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import cookiesServerCall from "../services/cookiesServerCall";
// import workoutServerCall from "../services/workoutsServerCall";

// function DeleteExerciseFromWorkoutButton({ exercise }) {
//   const [open, setOpen] = useState(false);
//   const [selectedWorkout, setSelectedWorkout] = useState("");
//   const [workouts, setWorkouts] = useState([]);

//   async function handleClickOpen() {
//     try {
//       const cookies = await cookiesServerCall.getCookies();
//       const userLoggedIn = cookies.LoggedIn;
//       if (!userLoggedIn) {
//         throw new Error("Login required to fetch workouts");
//       }
//       const userDataObject = JSON.parse(userLoggedIn);
//       const user_id = userDataObject.userID;

//       const userWorkouts = await workoutServerCall.getWorkoutsByUserId(user_id);
//       setWorkouts(userWorkouts);
//     } catch (error) {
//       console.error(error);
//     }
//     setOpen(true);
//   }

//   function handleClose() {
//     setOpen(false);
//   }

//   async function handleDeleteExercise() {
//     if (selectedWorkout) {
//       try {
//         await workoutServerCall.deleteExerciseFromWorkout(
//           exercise.id,
//           selectedWorkout
//         );
//         console.log("Exercício removido da rotina:", selectedWorkout);
//         setOpen(false);
//       } catch (error) {
//         console.error("Erro ao remover exercício da rotina", error);
//       }
//     }
//   }

//   return (
//     <>
//       <Button
//         variant="contained"
//         size="small"
//         color="error"
//         sx={{ backgroundColor: "#ff2625" }}
//         onClick={handleClickOpen}
//       >
//         Remove from my workout
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Select Routine to Remove Exercise</DialogTitle>
//         <DialogContent>
//           <TextField
//             select
//             label="Existing Routine"
//             value={selectedWorkout}
//             onChange={(e) => setSelectedWorkout(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             {workouts.map((workout) => (
//               <MenuItem key={workout.id} value={workout.id}>
//                 {workout.title}
//               </MenuItem>
//             ))}
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteExercise} color="primary">
//             Remove
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default DeleteExerciseFromWorkoutButton;

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation } from "wouter";
import workoutServerCall from "../services/workoutsServerCall";

function DeleteExerciseFromWorkoutButton({ exercise }) {
  const [location] = useLocation(); // Obtenha a localização atual
  const [workoutID, setWorkoutID] = useState(null);

  // Extraia o ID do treino da URL
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
