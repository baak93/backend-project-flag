const baseDomain = "http://localhost:3000";

async function getAllExercises() {
  const options = {
    credentials: "include",
  };
  const response = await fetch(baseDomain + "/exercises", options);
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

async function getExercisesByMuscle(muscle) {
  const response = await fetch(baseDomain + "/exercises?muscle=" + muscle);
  const result = await response.json();
  return result;
}

async function getExercisesByDifficulty(difficulty) {
  const response = await fetch(
    baseDomain + "/exercises?difficulty=" + difficulty
  );
  const result = await response.json();
  return result;
}

async function getExercisesByFilters(muscle, difficulty) {
  const response = await fetch(
    baseDomain + "/exercises?difficulty=" + difficulty + "&muscle=" + muscle
  );
  const result = await response.json();
  return result;
}

async function getExercisesBySearch(search) {
  const response = await fetch(baseDomain + "/exercises?search=" + search);
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
