import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useLocation } from "wouter";

function ExerciseSearchBar() {
  const [search, setSearch] = useState("");
  const [_, setLocation] = useLocation();

  async function handleSearch() {
    if (search) {
      setLocation(`/exercises?search=${search}`);
      window.location.reload(); //not ideal
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
        <Typography
          fontWeight={700}
          sx={{ fontSize: { lg: "44px", xs: "30px" } }}
          mb="49px"
          textAlign="center"
        >
          Looking for a unique workout ? <br /> Simplify your search
        </Typography>
        <Box position="relative" mb="72px">
          <TextField
            height="76px"
            sx={{
              input: { fontWeight: "700", border: "none", borderRadius: "4px" },
              width: { lg: "60vw", xs: "350px" },
              backgroundColor: "#fff",
              borderRadius: "40px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onKeyDown={handleKeyDown}
            placeholder="Search Exercises"
            type="text"
          />
          <Button
            className="search-btn"
            sx={{
              bgcolor: "#FF2625",
              color: "#fff",
              textTransform: "none",
              width: { lg: "173px", xs: "80px" },
              height: "56px",
              position: "absolute",
              right: "0px",
              fontSize: { lg: "20px", xs: "14px" },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default ExerciseSearchBar;
