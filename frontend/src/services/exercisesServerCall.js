const baseDomain = "http://localhost:3000";

async function getAllExercises() {
  const options = {
    credentials: "include",
  };
  const response = await fetch(baseDomain + "/exercises", options);
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

export default {
  getAllExercises,
  getExercisesByWorkoutId,
  getExerciseCategories,
};
