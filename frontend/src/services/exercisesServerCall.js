const baseDomain = "http://localhost:3000";

async function getAllExercises() {
  const options = {
    credentials: "include",
  };
  const response = await fetch(baseDomain + "/exercises", options);
  const result = await response.json();
  return result;
}

export default {
  getAllExercises,
};
