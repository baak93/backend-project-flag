const exercisesDB = require("../db/exercisesDB");

async function getExercises(req, res) {
  const { difficulty, muscle, search } = req.query;
  const workout_id = req.params.id;
  const limit = parseInt(req.query.limit, 10) || 12;
  const offset = parseInt(req.query.offset, 10) || 0;

  try {
    if (difficulty && muscle) {
      const result = await exercisesDB.getExercisesByFilters(
        difficulty,
        muscle,
        limit,
        offset
      );
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
      res.json(result);
    } else if (!difficulty && muscle) {
      const result = await exercisesDB.getExercisesByMuscle(
        muscle,
        limit,
        offset
      );
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
      res.json(result);
    } else if (difficulty && !muscle) {
      const result = await exercisesDB.getExercisesByDifficulty(
        difficulty,
        limit,
        offset
      );
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
      res.json(result);
    } else if (search) {
      const result = await exercisesDB.getExercisesBySearch(
        search,
        limit,
        offset
      );
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
      const result = await exercisesDB.getAllExercises(limit, offset);
      result.forEach((exercise) => {
        exercise.image = process.env.DOMAIN + exercise.image;
      });
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

async function getExerciseById(req, res) {
  const { id } = req.params;
  const result = await exercisesDB.getExerciseById(id);
  result[0].image = process.env.DOMAIN + result[0].image;

  res.json(result[0]);
}

async function postExercise(req, res) {
  const { name, muscle, difficulty, image, instructions } = req.body;
  // TODO: add validation

  try {
    const result = await exercisesDB.insertExercise(
      name,
      muscle,
      difficulty,
      image,
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
  getExerciseById,
  postExercise,
  putExercise,
  deleteExercise,
};
