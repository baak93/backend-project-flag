const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.post("/exercises", exercisesController.postExercise);

module.exports = router;
