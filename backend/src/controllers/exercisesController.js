const exercisesDB = require("../db/exercises");

async function getExercises(req, res) {
  const { difficulty, muscle } = req.query;

  try {
    if (difficulty && muscle) {
      const result = await exercisesDB.getExercisesByFilters(
        difficulty,
        muscle
      );
      res.json(result);
    } else if (!difficulty && muscle) {
      const result = await exercisesDB.getExercisesByMuscle(muscle);
      res.json(result);
    } else if (difficulty && !muscle) {
      const result = await exercisesDB.getExercisesByDifficulty(difficulty);
      res.json(result);
    } else {
      const result = await exercisesDB.getAllExercises();
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function postExercise(req, res) {
  const { name, muscle, difficulty, instructions } = req.body;
  // TODO: add validation

  try {
    const result = await exercisesDB.insertExercise(
      name,
      muscle,
      difficulty,
      instructions
    );

    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function putExercise(req, res) {
  const { id } = req.params;
  const { name, muscle, difficulty, instructions } = req.body;
  // TODO: add validation

  try {
    const result = await exercisesDB.updateExercise(
      id,
      name,
      muscle,
      difficulty,
      instructions
    );

    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getExercises,
  postExercise,
  putExercise,
};
