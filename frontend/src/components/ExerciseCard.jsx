// import { Card } from "primereact/card";
// import { Button } from "primereact/button";

// function ExerciseCard({ exercise }) {
//   const header = <img alt="exercise.img (Ainda por adicionar a API)" src="#" />;
//   const footer = (
//     <div className="flex flex-wrap justify-content-end gap-2">
//       <Button label="Add" icon="pi pi-check" />
//       <Button label="Remove" icon="pi pi-times" severity="secondary" />
//     </div>
//   );
//   return (
//     <Card
//       title={exercise.name}
//       subTitle={exercise.muscle + " - " + exercise.difficulty}
//       footer={footer}
//       header={header}
//       className="md:w-25rem"
//     >
//       <p className="m-0">{exercise.instructions}</p>
//     </Card>
//   );
// }

// export default ExerciseCard;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Chip } from "@mui/material";

export default function ExerciseCard({ exercise }) {
  // Divide os valores do campo muscle em um array
  const muscles = exercise.muscle.split(",").map((muscle) => muscle.trim());

  return (
    <Card sx={{ maxWidth: 345, marginTop: "24px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={exercise.image}
          alt={exercise.name}
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {exercise.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {exercise.difficulty} -
            {/* Mapeia sobre os músculos e exibe cada um como uma tag Chip */}
            {muscles.map((muscle, index) => (
              <Chip
                key={index}
                label={muscle}
                variant="outlined"
                size="small"
                style={{ marginRight: 4 }}
              />
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="error"
          sx={{ backgroundColor: "#ff2625" }}
        >
          Add to my routine
        </Button>
      </CardActions>
    </Card>
  );
}
