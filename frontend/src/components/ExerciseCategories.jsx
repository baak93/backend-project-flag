import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import exercisesServerCall from "../services/exercisesServerCall";
import { useLocation } from "wouter";

function ExerciseCategories() {
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useLocation();

  useEffect(function () {
    (async function () {
      const results = await exercisesServerCall.getExerciseCategories();
      setCategories(results);
    })();
  }, []);

  function handleCardClick(category) {
    setLocation(`/exercises?muscle=${category}`);
  }
  return (
    <>
      <Box sx={{ marginBottom: "24px", textAlign: "center", fontSize: "24px" }}>
        Check out our exercise selection
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              onClick={() => handleCardClick(category)}
              sx={{
                maxWidth: 345,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                image="/img/category-icon2.png"
                alt={category}
                sx={{ width: 60, height: 60, marginBottom: "16px" }} // Ajuste o tamanho do ícone conforme necessário
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" component="div">
                  {category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ExerciseCategories;
