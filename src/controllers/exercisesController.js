const connection = require("../db/connection");

// async function getAllExercises(req, res) {
//   try {
//     const [result] = await connection
//       .promise()
//       .query(`SELECT * FROM exercises`);
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//     throw new Error("Something went wrong!");
//   }
// }

// async function getExercisesByMuscle(req, res) {
//   const { muscle } = req.params;
//   const params = [muscle];

//   try {
//     const [result] = await connection
//       .promise()
//       .query(`SELECT * FROM exercises WHERE muscle = ?`, params);
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//     throw new Error("Something went wrong!");
//   }
// }

// async function getExercisesByDifficulty(req, res) {
//   const { difficulty } = req.params;
//   const [params] = [difficulty];

//   console.log(difficulty);
//   console.log(params);

//   try {
//     const [result] = await connection
//       .promise()
//       .query(`SELECT * FROM exercises WHERE difficulty = ?`, params);
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// }

async function getExercises(req, res) {
  const { difficulty, muscle } = req.query;
  let params;
  let query;

  try {
    if (difficulty && muscle) {
      params = [difficulty, muscle];
      query = `SELECT * FROM exercises WHERE difficulty = ? AND muscle = ?`;
    } else if (!difficulty && muscle) {
      params = [muscle];
      query = `SELECT * FROM exercises WHERE muscle = ?`;
    } else if (difficulty && !muscle) {
      params = [difficulty];
      query = `SELECT * FROM exercises WHERE difficulty = ?`;
    } else {
      query = `SELECT * FROM exercises`;
    }

    const [result] = await connection.promise().query(query, params);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function insertExercise(req, res) {
  const { name, muscle, difficulty, instructions } = req.body;
  const params = [name, muscle, difficulty, instructions];
  // TODO: add validation

  try {
    const query = `INSERT INTO exercises (name, muscle, difficulty, instructions) VALUES(?, ?, ?, ?)`;
    const result = await connection.promise().query(query, params);

    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  // getAllExercises,
  // getExercisesByMuscle,
  // getExercisesByDifficulty,
  getExercises,
  insertExercise,
};
