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

function deleteWorkout() {}

// function editWorkoutTitle() {}

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

function removeExerciseFromWorkout() {}

module.exports = {
  createWorkout,
  getWorkoutsByUserId,
  deleteWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  // editWorkoutTitle
};
