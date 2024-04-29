const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.get("/exercises", exercisesController.getExercises);

module.exports = router;
