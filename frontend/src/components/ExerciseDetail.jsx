import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import workoutServerCall from "../services/workoutsServerCall";

function ExerciseDetail() {
  const [match, params] = useRoute("/exercisedetail/:id");
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        const exerciseData = await workoutServerCall.getExerciseById(params.id);
        setExercise(exerciseData);
      } catch (error) {
        console.error("Error fetching exercise detail:", error);
      }
    };

    fetchExerciseDetail();
  }, [params.id]);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  console.log("exercise", exercise.image);

  return (
    <div>
      <h1>{exercise.name}</h1>
      <img src={exercise.image} alt={exercise.name} />
      <p>Difficulty: {exercise.difficulty}</p>
      <p>Muscles: {exercise.muscle}</p>
      <p>Instructions: {exercise.instructions}</p>
    </div>
  );
}

export default ExerciseDetail;
