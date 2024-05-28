import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  styled,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import workoutsServerCall from "../services/workoutsServerCall";

// Estilizando o IconButton para ter o mesmo border-radius do botão details
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

function WorkoutCard({ workout }) {
  const { id, title } = workout;

  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function handleDeleteClick() {
    setOpenDialog(true);
  }

  async function handleDeleteConfirm() {
    setOpenDialog(false);
    try {
      await workoutsServerCall.deleteWorkoutById(id);
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.reload(); // Atualiza a página após 1,5 segundos
      }, 1500);
    } catch (error) {
      console.error("Error deleting workout:", error);
      // Lidar com o erro, se necessário
    }
  }

  function handleDeleteCancel() {
    setOpenDialog(false);
  }

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }

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
          <CustomIconButton
            onClick={handleDeleteClick}
            sx={{
              backgroundColor: "#686D76",
              "&:hover": {
                backgroundColor: "#ff2625",
              },
            }}
          >
            <DeleteIcon />
          </CustomIconButton>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{
              backgroundColor: "#686D76",
              "&:hover": {
                backgroundColor: "#ff2625",
              },
              marginLeft: "8px",
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

      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Workout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this workout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message="Workout deleted successfully"
      />
    </Grid>
  );
}

export default WorkoutCard;
