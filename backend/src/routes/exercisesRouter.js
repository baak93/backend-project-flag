const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.get("/exercises", exercisesController.getExercises);
router.get("/exercises/categories", exercisesController.getExerciseCategories);

module.exports = router;
