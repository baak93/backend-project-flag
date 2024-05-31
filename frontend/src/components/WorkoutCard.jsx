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
  styled,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import workoutsServerCall from "../services/workoutsServerCall";

// Estilizando o IconButton para ter o mesmo border-radius do botão details
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.8),
}));

function WorkoutCard({ workout, onRemove }) {
  const { id, title } = workout;

  const [openDialog, setOpenDialog] = useState(false);

  function handleDeleteClick() {
    setOpenDialog(true);
  }

  async function handleDeleteConfirm() {
    setOpenDialog(false);

    try {
      await workoutsServerCall.deleteWorkoutById(id);
      onRemove(id);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  }

  function handleDeleteCancel() {
    setOpenDialog(false);
  }

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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <CustomIconButton
            onClick={handleDeleteClick}
            sx={{
              backgroundColor: "#686D76",
              "&:hover": {
                backgroundColor: "#ff2625",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
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
    </Grid>
  );
}

export default WorkoutCard;
