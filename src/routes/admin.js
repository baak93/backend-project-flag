const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.post("/exercises", exercisesController.postExercise);
router.put("/exercises/:id", exercisesController.putExercise);

module.exports = router;
