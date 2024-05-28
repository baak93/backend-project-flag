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

  const response = await fetch(`${baseDomain}/workouts`, options);
  const result = await response.json();
  return result;
}

async function deleteWorkoutById(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(`${baseDomain}/workout/${id}`, options);

  if (response.ok) {
    // Se a solicitação foi bem-sucedida e o status é 200-299, retorna vazio
    return;
  } else {
    // Se houve um erro, lança uma exceção com a mensagem de erro
    const errorData = await response.json();
    throw new Error(errorData.error || "Error deleting workout");
  }
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

  const response = await fetch(`${baseDomain}/${workoutID}/exercises`, options);
  const result = await response.json();
  return result;
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
  const result = await response.json();
  return result;
}

async function getWorkoutsByUserId(user_id) {
  const response = await fetch(`${baseDomain}/workouts/${user_id}`);
  const result = await response.json();

  return result[0];
}

export default {
  postWorkout,
  deleteWorkoutById,
  postExerciseIntoWorkout,
  deleteExerciseFromWorkout,
  getWorkoutsByUserId,
};
