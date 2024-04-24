const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.get("/exercises", exercisesController.getAllExercises);
router.get(
  "/exercises/:difficulty",
  exercisesController.getExercisesByDifficulty
);
router.get("/exercises/:muscle", exercisesController.getExercisesByMuscle);

module.exports = router;
