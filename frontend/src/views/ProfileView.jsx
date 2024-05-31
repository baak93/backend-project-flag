import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

const ProfileContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

function ProfileView() {
  const [profile, setProfile] = useState({
    name: "Bruno",
    weight: "75kg",
    height: "172cm",
    goals: "Build muscle, improve endurance",
    fitnessLevel: "Intermediate",
    otherInfo:
      "I love outdoor activities and sports. I usually have one hour a day to dedicate to exercising.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <ProfileContainer maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <ProfileAvatar src="/path/to/avatar.jpg" alt="User Avatar" />
        <Typography variant="h4" gutterBottom>
          {profile.name}
        </Typography>
      </Box>

      <ProfileCard>
        <CardHeader title="User Information" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height"
                name="height"
                value={profile.height}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fitness Level"
                name="fitnessLevel"
                value={profile.fitnessLevel}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Goals"
                name="goals"
                value={profile.goals}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Other Information"
                name="otherInfo"
                value={profile.otherInfo}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </CardContent>
      </ProfileCard>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </ProfileContainer>
  );
}

export default ProfileView;
