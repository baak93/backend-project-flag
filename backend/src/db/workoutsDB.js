const connection = require("./connection");

async function createWorkout(title, user_id) {
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
    return workoutData;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Something went wrong! Error creating workout.");
  }
}

async function getWorkoutsByUserId(userId) {
  const query = `SELECT * FROM workouts WHERE user_id = ?`;
  const params = [userId];

  const workoutsResult = await connection.promise().query(query, params);

  return workoutsResult;
}

async function getWorkoutById(workoutId) {
  const query = `SELECT * FROM workouts WHERE id = ?`;
  const params = workoutId;

  const workoutsResult = await connection.promise().query(query, params);

  return workoutsResult[0];
}

async function deleteWorkoutById(workoutId) {
  try {
    const queryCleanWorkout = `DELETE FROM workouts_exercises WHERE workout_id = ?`;
    const queryDeleteWorkout = `DELETE FROM workouts WHERE id = ?`;
    const params = [workoutId];
    await connection.promise().query(queryCleanWorkout, params);
    await connection.promise().query(queryDeleteWorkout, params);
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw new Error("Error deleting workout");
  }
}

async function addExerciseToWorkout(workoutID, exerciseID) {
  try {
    const query = `INSERT INTO workouts_exercises (workout_id, exercise_id) VALUES (?, ?)`;
    const params = [workoutID, exerciseID];

    const result = await connection.promise().query(query, params);

    return result;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Something went wrong! Error creating workout.");
  }
}

async function removeExerciseFromWorkout(workoutId, exerciseId) {
  try {
    const query = `DELETE FROM workouts_exercises WHERE workout_id = ? AND exercise_id = ?`;
    const params = [workoutId, exerciseId];

    const result = await connection.promise().query(query, params);

    return result;
  } catch (error) {
    console.error("Error removing exercise from workout:", error);
    throw new Error("Error removing exercise from workout");
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
