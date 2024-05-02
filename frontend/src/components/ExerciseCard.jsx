import { Card } from "primereact/card";

function ExerciseCard({ exercise }) {
  return (
    <Card title={exercise.name}>
      <p className="m-0">{exercise.muscle}</p>
      <p className="m-0">{exercise.difficulty}</p>
      <p className="m-0">{exercise.instructions}</p>
    </Card>
  );
}

export default ExerciseCard;
