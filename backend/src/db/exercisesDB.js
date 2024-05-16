const connection = require("./connection");

async function getAllExercises() {
  try {
    const [result] = await connection
      .promise()
      .query(`SELECT * FROM exercises`);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get all exercises.");
  }
}

async function getExercisesByMuscle(muscle) {
  const params = [`%${muscle}%`];

  try {
    const [result] = await connection
      .promise()
      .query(`SELECT * FROM exercises WHERE muscle LIKE ?`, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get the exercise.");
  }
}

async function getExercisesByDifficulty(difficulty) {
  const [params] = [difficulty];

  try {
    const [result] = await connection
      .promise()
      .query(`SELECT * FROM exercises WHERE difficulty = ?`, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get the exercise.");
  }
}

async function getExercisesByFilters(difficulty, muscle) {
  const params = [difficulty, `%${muscle}%`];

  try {
    const [result] = await connection
      .promise()
      .query(
        `SELECT * FROM exercises WHERE difficulty = ? AND muscle LIKE ?`,
        params
      );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Something went wrong! Filter by difficulty and/or muscle."
    );
  }
}

async function getExercisesByWorkoutId(workout_id) {
  const params = [workout_id];
  const query = `SELECT exercises.id, exercises.name, exercises.muscle, exercises.difficulty, exercises.instructions, exercises.image
  FROM exercises 
  JOIN workouts_exercises ON exercises.id = workouts_exercises.exercise_id
  JOIN workouts ON workouts_exercises.workout_id = workouts.id
  WHERE workouts.id = ?`;

  const result = await connection.promise().query(query, params);
  return result;
}

async function insertExercise(name, muscle, difficulty, instructions) {
  const params = [name, muscle, difficulty, instructions];

  try {
    const query = `INSERT INTO exercises (name, muscle, difficulty, instructions) VALUES(?, ?, ?, ?)`;
    const result = await connection.promise().query(query, params);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while trying to Insert an exercise!");
  }
}

async function updateExercise(id, name, muscle, difficulty, instructions) {
  const params = [name, muscle, difficulty, instructions, id];

  try {
    const query = `UPDATE exercises SET name = ?, muscle = ?, difficulty = ?, instructions = ? WHERE id = ?`;
    const result = await connection.promise().query(query, params);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while trying to Update an exercise!");
  }
}

async function deleteExercise(id = "") {
  const query = `DELETE from exercises where id = ?`;

  try {
    const result = await connection.promise().query(query, id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
}

module.exports = {
  getAllExercises,
  getExercisesByMuscle,
  getExercisesByDifficulty,
  getExercisesByFilters,
  getExercisesByWorkoutId,
  insertExercise,
  updateExercise,
  deleteExercise,
};
