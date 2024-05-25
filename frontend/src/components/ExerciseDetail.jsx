import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import exercisesServerCall from "../services/exercisesServerCall";
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";

function ExerciseDetail() {
  const [match, params] = useRoute("/exercisedetail/:id");
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        const exerciseData = await exercisesServerCall.getExerciseById(
          params.id
        );
        setExercise(exerciseData);
      } catch (error) {
        console.error("Error fetching exercise detail:", error);
      }
    };

    fetchExerciseDetail();
  }, [params.id]);

  if (!exercise) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  console.log("image url", exercise.image); //falta adicionar http://localhost:3000, mas quando adiciono dá erro de CORS

  return (
    <Container>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h3" component="h1" gutterBottom>
          {exercise.name}
        </Typography>
        <Card sx={{ maxWidth: 600, width: "100%" }}>
          <CardMedia
            component="img"
            image={exercise.image}
            alt={exercise.name}
            sx={{ height: 400, objectFit: "contain" }}
          />
          <Box p={2}>
            <Typography variant="h6" component="p" gutterBottom>
              Difficulty: {exercise.difficulty}
            </Typography>
            <Typography variant="h6" component="p" gutterBottom>
              Muscles: {exercise.muscle}
            </Typography>
            <Typography variant="h6" component="p" gutterBottom>
              Instructions:
            </Typography>
            <Typography variant="body1" component="p">
              {exercise.instructions}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default ExerciseDetail;
