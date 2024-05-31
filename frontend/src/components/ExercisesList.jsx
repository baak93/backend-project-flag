import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";
import exercisesServerCall from "../services/exercisesServerCall";
import ExerciseCard from "./ExerciseCard";
import { useLocation } from "wouter";

function ExercisesList() {
  const [exercises, setExercises] = useState([]);
  const [location, setLocation] = useLocation();
  const [limit, setLimit] = useState(12); // Default limit
  const [offset, setOffset] = useState(0); // Default offset

  const params = new URLSearchParams(window.location.search);
  const muscle = params.get("muscle");
  const difficulty = params.get("difficulty");
  const search = params.get("search");

  async function fetchExercises(limit, offset) {
    let results;

    if (muscle && difficulty) {
      results = await exercisesServerCall.getExercisesByFilters(
        muscle,
        difficulty,
        limit,
        offset
      );
    } else if (muscle) {
      results = await exercisesServerCall.getExercisesByMuscle(
        muscle,
        limit,
        offset
      );
    } else if (difficulty) {
      results = await exercisesServerCall.getExercisesByDifficulty(
        difficulty,
        limit,
        offset
      );
    } else if (search) {
      results = await exercisesServerCall.getExercisesBySearch(
        search,
        limit,
        offset
      );
    } else {
      results = await exercisesServerCall.getAllExercises(limit, offset);
    }

    setExercises(results);
  }

  useEffect(
    function () {
      window.scrollTo(0, 0);
      fetchExercises(limit, offset);
    },
    [location, limit, offset]
  );

  const buildUrl = (newLimit, newOffset) => {
    let url = `${window.location.pathname}?limit=${newLimit}&offset=${newOffset}`;
    if (muscle) url += `&muscle=${muscle}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (search) url += `&search=${search}`;
    return url;
  };

  const handleNext = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    setLocation(buildUrl(limit, newOffset));
  };

  const handlePrevious = () => {
    const newOffset = Math.max(0, offset - limit);
    setOffset(newOffset);
    setLocation(buildUrl(limit, newOffset));
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setOffset(0); // Reset offset when limit changes
    setLocation(buildUrl(newLimit, 0));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <FormControl sx={{ mb: 2, width: 150 }}>
        <InputLabel>Exercises per page</InputLabel>
        <Select
          value={limit}
          onChange={handleLimitChange}
          label="Exercícios por página"
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={48}>48</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} justifyContent="center">
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "#686D76",
            "&:hover": {
              backgroundColor: "#ff2625",
            },
          }}
          onClick={handlePrevious}
          disabled={offset === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#686D76",
            "&:hover": {
              backgroundColor: "#ff2625",
            },
          }}
          onClick={handleNext}
          disabled={exercises.length < limit}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
}

export default ExercisesList;
