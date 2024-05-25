const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.get("/exercises", exercisesController.getExercises);
router.get("/exercises/categories", exercisesController.getExerciseCategories);
router.get("/exercises/:id", exercisesController.getExerciseById);

module.exports = router;
