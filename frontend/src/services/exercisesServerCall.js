const baseDomain = "http://localhost:3000";

async function getAllExercises(limit, offset) {
  const options = {
    credentials: "include",
  };
  const response = await fetch(
    `${baseDomain}/exercises?limit=${limit}&offset=${offset}`,
    options
  );
  const result = await response.json();
  return result;
}

async function getExerciseById(exerciseID) {
  const response = await fetch(`${baseDomain}/exercises/${exerciseID}`);
  const result = await response.json();
  return result;
}

async function getExercisesByWorkoutId(id) {
  const response = await fetch(baseDomain + "/workoutdetail/" + id);
  const result = await response.json();
  return result;
}

async function getExerciseCategories() {
  const response = await fetch(baseDomain + "/exercises/categories");
  const result = await response.json();
  const muscleValues = result.flatMap((item) => item.muscle.split(", "));
  const uniqueMuscles = [...new Set(muscleValues)];
  return uniqueMuscles;
}

async function getExercisesByMuscle(muscle, limit, offset) {
  const response = await fetch(
    `${baseDomain}/exercises?muscle=${muscle}&limit=${limit}&offset=${offset}`
  );
  const result = await response.json();
  return result;
}

async function getExercisesByDifficulty(difficulty, limit, offset) {
  const response = await fetch(
    `${baseDomain}/exercises?difficulty=${difficulty}&limit=${limit}&offset=${offset}`
  );
  const result = await response.json();
  return result;
}

async function getExercisesByFilters(muscle, difficulty, limit, offset) {
  const response = await fetch(
    `${baseDomain}/exercises?difficulty=${difficulty}&muscle=${muscle}&limit=${limit}&offset=${offset}`
  );
  const result = await response.json();
  return result;
}

async function getExercisesBySearch(search, limit, offset) {
  const response = await fetch(
    `${baseDomain}/exercises?search=${search}&limit=${limit}&offset=${offset}`
  );
  const result = await response.json();
  return result;
}

export default {
  getAllExercises,
  getExerciseById,
  getExercisesByWorkoutId,
  getExerciseCategories,
  getExercisesByMuscle,
  getExercisesByDifficulty,
  getExercisesByFilters,
  getExercisesBySearch,
};
