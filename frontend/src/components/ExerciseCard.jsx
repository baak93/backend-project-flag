import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardActions, Chip } from "@mui/material";
import { useLocation } from "wouter";
import AddToWorkoutButton from "./AddToWorkoutButton";
import DeleteFromWorkoutButton from "./DeleteFromWorkoutButton";

export default function ExerciseCard({ exercise }) {
  const muscles = exercise.muscle.split(",").map((muscle) => muscle.trim());

  const [location] = useLocation();
  let actionButton;

  if (location === "/Exercises") {
    actionButton = <AddToWorkoutButton exercise={exercise} />;
  } else if (location.startsWith("/workoutdetail/")) {
    actionButton = <DeleteFromWorkoutButton exercise={exercise} />;
  }

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
        {actionButton}
      </CardActions>
    </Card>
  );
}
