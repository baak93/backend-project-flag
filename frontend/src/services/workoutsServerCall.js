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

  const response = await fetch(baseDomain + "/workout", options);
  const data = await response.json();
  return data;
}

export default {
  postWorkout,
};
