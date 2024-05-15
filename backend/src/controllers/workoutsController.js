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

function deleteWorkout() {}

// function editWorkoutTitle() {}

function addExerciseToWorkout() {}

function removeExerciseFromWorkout() {}

module.exports = {
  createWorkout,
  deleteWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  // editWorkoutTitle
};
