const baseDomain = "http://localhost:3000";

async function postWorkout(workoutData) {
  const options = {
    method: "POST",
    body: JSON.stringify(workoutData),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(baseDomain + "/workouts", options);
  const data = await response.json();
  return data;
}

async function getWorkoutsByUserId(user_id) {
  const response = await fetch(baseDomain + "/workouts/" + user_id);
  const data = await response.json();

  return data[0];
}

export default {
  postWorkout,
  getWorkoutsByUserId,
};
