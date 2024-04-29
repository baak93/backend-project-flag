require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const exercisesRouter = require("./routes/exercises");
const adminRouter = require("./routes/admin");

const port = 3000;

app.use(cors());
app.use(express.json());

app.use(exercisesRouter);
app.use(adminRouter);

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
