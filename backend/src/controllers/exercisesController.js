const exercisesDB = require("../db/exercisesDB");

async function getExercises(req, res) {
  const { difficulty, muscle } = req.query;
  const workout_id = req.params.id;

  try {
    if (difficulty && muscle) {
      const result = await exercisesDB.getExercisesByFilters(
        difficulty,
        muscle
      );
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
      res.json(result);
    } else if (!difficulty && muscle) {
      const result = await exercisesDB.getExercisesByMuscle(muscle);
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
      res.json(result);
    } else if (difficulty && !muscle) {
      const result = await exercisesDB.getExercisesByDifficulty(difficulty);
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
      res.json(result);
    } else if (workout_id) {
      const result = await exercisesDB.getExercisesByWorkoutId(workout_id);

      result[0].forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
      res.json(result);
    } else {
      const result = await exercisesDB.getAllExercises();
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      }); //lê o url da variavel de ambiente e concatena com o caminho da imagem da base de dados
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

async function getExerciseCategories(req, res) {
  const result = await exercisesDB.getCategories();
  res.json(result);
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

async function deleteExercise(req, res) {
  const id = req.params.id;

  try {
    const result = await exercisesDB.deleteExercise(id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getExercises,
  getExerciseCategories,
  postExercise,
  putExercise,
  deleteExercise,
};
