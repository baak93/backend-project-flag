const router = require("express").Router();
const exercisesController = require("../controllers/exercisesController");

router.post("/", exercisesController.postExercise);
router.put("/:id", exercisesController.putExercise);
router.delete("/:id", exercisesController.deleteExercise);

module.exports = router;
