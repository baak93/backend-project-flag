const workoutsDB = require("../db/workoutsDB");

async function createWorkout(req, res) {
  const { user_id, title } = req.body;

  try {
    const workoutData = await workoutsDB.createWorkout(title, user_id);
    res.json(workoutData);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getWorkoutsByUserId(req, res) {
  const { userId } = req.params;

  try {
    const workoutsResult = await workoutsDB.getWorkoutsByUserId(userId);
    res.json(workoutsResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getWorkoutById(req, res) {
  const { workoutId } = req.params;

  try {
    const workoutResult = await workoutsDB.getWorkoutById(workoutId);
    res.json(workoutResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteWorkoutById(req, res) {
  const workoutId = req.params.id;

  try {
    await workoutsDB.deleteWorkoutById(workoutId);
    res.status(204).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function addExerciseToWorkout(req, res) {
  const { exerciseID } = req.body;
  const { workoutID } = req.params;

  try {
    const result = await workoutsDB.addExerciseToWorkout(workoutID, exerciseID);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function removeExerciseFromWorkout(req, res) {
  const { workoutId, exerciseId } = req.params;

  try {
    const result = await workoutsDB.removeExerciseFromWorkout(
      workoutId,
      exerciseId
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createWorkout,
  getWorkoutsByUserId,
  getWorkoutById,
  deleteWorkoutById,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
};
