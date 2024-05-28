import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function WorkoutCard({ workout }) {
  const { id, title } = workout; //exercises seria descontruido aqui para indicar quantos exercicios o workout possui

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%", position: "relative" }}>
        <CardActionArea style={{ flexGrow: 1 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ overflowWrap: "break-word" }}
            >
              <span style={{ paddingRight: "120px" }}>{title}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ position: "absolute", bottom: 8, right: 8 }}>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{
              backgroundColor: "#686D76",
              "&:hover": {
                backgroundColor: "#ff2625",
              },
            }}
            onClick={() => {
              window.location.href = `/workoutdetail/${id}`;
              console.log("Detalhes do treino:", workout);
            }}
          >
            Details
            <VisibilityIcon sx={{ ml: 1 }} />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
