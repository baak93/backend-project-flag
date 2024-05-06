require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const exercisesRouter = require("./routes/exercisesRouter");
const adminRouter = require("./routes/adminRouter");

const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(exercisesRouter);
app.use("/exercises", adminRouter);

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
