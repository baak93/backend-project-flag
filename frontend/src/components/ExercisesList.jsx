import { useEffect, useState } from "react";
import exercisesServerCalls from "../services/exercisesServerCall";
import ExerciseCard from "./ExerciseCard";

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(function () {
    (async function () {
      const results = await exercisesServerCalls.getAllExercises();
      setExercises(results);
    })();
  }, []);

  return (
    <>
      {exercises.map((exercise, index) => (
        <ExerciseCard exercise={exercise} key={index} />
      ))}
    </>
  );
}

export default ExercisesList;
