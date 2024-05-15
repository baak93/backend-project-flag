const router = require("express").Router();
const authController = require("../controllers/authController");
const workoutsController = require("../controllers/workoutsController");
const cookiesController = require("../controllers/cookiesController");

router.post("/sign-up", authController.registerUser);
router.post("/sign-in", authController.loginUser);
router.post("/workouts", workoutsController.createWorkout);
router.get("/workouts/:id", workoutsController.getWorkoutsByUserId);
router.get("/cookies", cookiesController.getCookies);

module.exports = router;
