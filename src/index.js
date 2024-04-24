require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const exercisesRouter = require("./routes/exercises");

const port = 3000;

app.use(express.json());
app.use(cors());

app.use(exercisesRouter);

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
