import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import HeroBannerImage from "/img/hero-image.jpg";

function Hero() {
  return (
    <>
      <Box
        sx={{ mt: { lg: "212px", xs: "70px" }, ml: { sm: "50px" } }}
        position="relative"
        p="20px"
      >
        <Typography color="#FF2625" fontWeight="600" fontSize="26px">
          Elevate Your Workout Experience
        </Typography>
        <Typography
          fontWeight={700}
          sx={{ fontSize: { lg: "44px", xs: "40px" } }}
          mb="23px"
          mt="30px"
        >
          Sweat today, <br />
          Succeed tomorrow
        </Typography>
        <Typography
          fontSize="22px"
          fontFamily="Alegreya"
          lineHeight="35px"
          mb={3}
        >
          It's time to spice up your exercise routine <br />
          and give your body and mind a fresh challenge
        </Typography>
        {/* <Button variant="contained" color="error" href="/exercises">
          Explore Exercises
        </Button> */}
        <Stack>
          <a
            href="/exercises"
            style={{
              marginTop: "45px",
              textDecoration: "none",
              width: "200px",
              textAlign: "center",
              background: "#FF2625",
              padding: "14px",
              fontSize: "22px",
              textTransform: "none",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Explore Exercises
          </a>
        </Stack>
        <Typography
          fontWeight={600}
          color="#FF2625"
          sx={{
            opacity: "0.1",
            display: { lg: "block", xs: "none" },
            fontSize: "200px",
          }}
        >
          Workhard
        </Typography>
        <img
          src={HeroBannerImage}
          alt="hero-banner"
          className="hero-banner-img"
        />
      </Box>
    </>
  );
}

export default Hero;
