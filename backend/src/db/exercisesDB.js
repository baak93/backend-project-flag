const connection = require("./connection");

async function getAllExercises(limit = 12, offset = 0) {
  const params = [limit, offset];
  const query = `SELECT * FROM exercises LIMIT ? OFFSET ?`;

  try {
    const [result] = await connection.promise().query(query, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get all exercises.");
  }
}

async function getExerciseById(id) {
  const params = [id];
  const query = `SELECT * FROM exercises WHERE id = ?`;

  try {
    const [result] = await connection.promise().query(query, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get the exercise.");
  }
}

async function getExercisesByMuscle(muscle, limit = 12, offset = 0) {
  const params = [`%${muscle}%`, limit, offset];
  const query = `SELECT * FROM exercises WHERE muscle LIKE ? LIMIT ? OFFSET ?`;

  try {
    const [result] = await connection.promise().query(query, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get the exercise.");
  }
}

async function getExercisesByDifficulty(difficulty, limit = 12, offset = 0) {
  const params = [difficulty, limit, offset];
  const query = `SELECT * FROM exercises WHERE difficulty = ? LIMIT ? OFFSET ?`;

  try {
    const [result] = await connection.promise().query(query, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get the exercise.");
  }
}

async function getExercisesByFilters(
  difficulty,
  muscle,
  limit = 12,
  offset = 0
) {
  const params = [difficulty, `%${muscle}%`, limit, offset];
  const query = `SELECT * FROM exercises WHERE difficulty = ? AND muscle LIKE ? LIMIT ? OFFSET ?`;

  try {
    const [result] = await connection.promise().query(query, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Something went wrong! Filter by difficulty and/or muscle."
    );
  }
}

async function getExercisesBySearch(search, limit = 12, offset = 0) {
  const params = [`%${search}%`, `%${search}%`, `%${search}%`, limit, offset];
  const query = `SELECT * FROM exercises WHERE NAME LIKE ? OR muscle LIKE ? OR difficulty LIKE ? LIMIT ? OFFSET ?`;

  try {
    const [result] = await connection.promise().query(query, params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("0 exercise found");
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

async function getCategories() {
  try {
    const query = `SELECT muscle FROM exercises`;
    const [result] = await connection.promise().query(query);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong! Couldn't get categories.");
  }
}

async function insertExercise(name, muscle, difficulty, image, instructions) {
  const params = [name, muscle, difficulty, image, instructions];

  try {
    const query = `INSERT INTO exercises (name, muscle, difficulty, image, instructions) VALUES(?, ?, ?, ?, ?)`;
    const result = await connection.promise().query(query, params);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while trying to Insert an exercise!");
  }
}

async function updateExercise(
  id,
  name,
  muscle,
  difficulty,
  image,
  instructions
) {
  const params = [name, muscle, difficulty, image, instructions, id];

  try {
    const query = `UPDATE exercises SET name = ?, muscle = ?, difficulty = ?, image = ?, instructions = ? WHERE id = ?`;
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
  getExerciseById,
  getExercisesByMuscle,
  getExercisesByDifficulty,
  getExercisesByFilters,
  getExercisesBySearch,
  getExercisesByWorkoutId,
  getCategories,
  insertExercise,
  updateExercise,
  deleteExercise,
};
