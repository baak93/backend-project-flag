const connection = require("../db/connection");

async function createWorkout(req, res) {
  const { user_id, title } = req.body;

  try {
    const query = `INSERT INTO workouts (title, user_id) VALUES (?, ?)`;
    const params = [title, user_id];

    const workoutResult = await connection.promise().query(query, params);
    const workoutId = workoutResult[0].insertId;
    const workoutData = {
      workoutId,
      title,
      user_id,
    };
    res.json(workoutData);
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Something went wrong! Error creating workout.");
  }
}

async function getWorkoutsByUserId(req, res) {
  const user_id = req.params.id;

  const query = `SELECT * FROM workouts WHERE user_id = ?`;
  const params = [user_id];

  const workoutsResult = await connection.promise().query(query, params);
  console.log(workoutsResult);
  res.json(workoutsResult);
}

// function editWorkoutTitle() {}

async function deleteWorkoutById(req, res) {
  const workoutId = req.params.id;
  try {
    const queryCleanWorkout = `DELETE FROM workouts_exercises WHERE workout_id = ?`;
    const queryDeleteWorkout = `DELETE FROM workouts WHERE id = ?`;
    const params = [workoutId];
    await connection.promise().query(queryCleanWorkout, params);
    await connection.promise().query(queryDeleteWorkout, params);
    res.status(204).end(); // Retorna 204 No Content se o treino for excluído com sucesso
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ error: "Error deleting workout" });
  }
}

async function addExerciseToWorkout(req, res) {
  const { exerciseID } = req.body;
  const { workoutID } = req.params;
  try {
    const query = `INSERT INTO workouts_exercises (workout_id, exercise_id) VALUES (?, ?)`;
    const params = [workoutID, exerciseID];

    const result = await connection.promise().query(query, params);

    res.json(result);
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Something went wrong! Error creating workout.");
  }
}

async function removeExerciseFromWorkout(req, res) {
  const { workoutId, exerciseId } = req.params;
  try {
    const query = `DELETE FROM workouts_exercises WHERE workout_id = ? AND exercise_id = ?`;
    const params = [workoutId, exerciseId];

    const result = await connection.promise().query(query, params);

    res.json(result);
  } catch (error) {
    console.error("Error removing exercise from workout:", error);
    res.status(500).json({ error: "Error removing exercise from workout" });
  }
}

module.exports = {
  createWorkout,
  getWorkoutsByUserId,
  deleteWorkoutById,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  // editWorkoutTitle
};
