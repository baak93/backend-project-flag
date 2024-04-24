const connection = require("../db/connection");

async function getAllExercises(req, res) {
  try {
    const [result] = await connection
      .promise()
      .query(`SELECT * FROM exercises`);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
    // throw new Error("Something went wrong!");
  }
}

async function getExercisesByMuscle(req, res) {
  const { muscle } = req.params;
  const params = [muscle];

  try {
    const [result] = await connection
      .promise()
      .query(`SELECT * FROM exercises WHERE muscle = ?`, params);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
    // throw new Error("Something went wrong!");
  }
}

async function getExercisesByDifficulty(req, res) {
  const { difficulty } = req.params;
  const [params] = [difficulty];

  console.log(difficulty);
  console.log(params);

  try {
    const [result] = await connection
      .promise()
      .query(`SELECT * FROM exercises WHERE difficulty = ?`, params);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllExercises,
  getExercisesByMuscle,
  getExercisesByDifficulty,
};
