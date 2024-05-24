import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardActions, Chip } from "@mui/material";
import AddToWorkoutButton from "./AddToWorkoutButton";

export default function ExerciseCard({ exercise }) {
  // Divide os valores do campo muscle em um array
  const muscles = exercise.muscle.split(",").map((muscle) => muscle.trim());

  return (
    <Card
      sx={{
        maxWidth: 345,
        marginTop: "24px",
        minHeight: 400,
        position: "relative",
      }}
    >
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
      <CardActions style={{ position: "absolute", bottom: 8, right: 8 }}>
        <AddToWorkoutButton exercise={exercise} />
      </CardActions>
    </Card>
  );
}
