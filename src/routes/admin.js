const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.post("/exercises", exercisesController.insertExercise);

module.exports = router;
