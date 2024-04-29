const connection = require("../db/connection");

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
  const params = [muscle];

  try {
    const [result] = await connection
      .promise()
      .query(`SELECT * FROM exercises WHERE muscle = ?`, params);
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
  const params = [difficulty, muscle];

  try {
    const [result] = await connection
      .promise()
      .query(
        `SELECT * FROM exercises WHERE difficulty = ? AND muscle = ?`,
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

module.exports = {
  getAllExercises,
  getExercisesByMuscle,
  getExercisesByDifficulty,
  getExercisesByFilters,
  insertExercise,
};
