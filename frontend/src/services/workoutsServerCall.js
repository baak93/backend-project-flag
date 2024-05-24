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

async function postExerciseIntoWorkout(workoutID, exerciseID) {
  const body = {
    exerciseID,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(baseDomain + `/${workoutID}/exercises`, options);
  const data = await response.json();
  return data;
}

async function deleteExerciseFromWorkout(exerciseID, workoutID) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(
    `${baseDomain}/${workoutID}/exercises/${exerciseID}`,
    options
  );
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
  postExerciseIntoWorkout,
  deleteExerciseFromWorkout,
  getWorkoutsByUserId,
};
