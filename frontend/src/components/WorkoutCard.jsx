import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";

export default function WorkoutCard({ workout }) {
  const { title } = workout; //exercises seria descontruido aqui para indicar quantos exercicios o workout possui

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ overflowWrap: "break-word" }}
            >
              {title}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" component="div">
              Total Exercises: {exercises.length}
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              // Aqui você pode adicionar a lógica para exibir os detalhes do treino
              console.log("Detalhes do treino:", workout);
            }}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
