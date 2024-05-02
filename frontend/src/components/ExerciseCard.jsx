import { Card } from "primereact/card";
import { Button } from "primereact/button";

function ExerciseCard({ exercise }) {
  const header = <img alt="exercise.img (Ainda por adicionar a API)" src="#" />;
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button label="Add" icon="pi pi-check" />
      <Button label="Remove" icon="pi pi-times" severity="secondary" />
    </div>
  );
  return (
    <Card
      title={exercise.name}
      subTitle={exercise.muscle + " - " + exercise.difficulty}
      footer={footer}
      header={header}
      className="md:w-25rem"
    >
      <p className="m-0">{exercise.instructions}</p>
    </Card>
  );
}

export default ExerciseCard;
