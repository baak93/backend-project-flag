const router = require("express").Router();
const authController = require("../controllers/authController");
const workoutsController = require("../controllers/workoutsController");
const cookiesController = require("../controllers/cookiesController");
const exercisesController = require("../controllers/exercisesController");

router.post("/sign-up", authController.registerUser);
router.post("/sign-in", authController.loginUser);
router.post("/workouts", workoutsController.createWorkout);
router.post("/:workoutID/exercises", workoutsController.addExerciseToWorkout);
router.delete(
  "/:workoutId/exercises/:exerciseId",
  workoutsController.removeExerciseFromWorkout
);
router.get("/workouts/:id", workoutsController.getWorkoutsByUserId);
router.get("/workoutdetail/:id", exercisesController.getExercises);
router.get("/cookies", cookiesController.getCookies);

module.exports = router;
