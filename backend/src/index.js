require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const exercisesRouter = require("./routes/exercisesRouter");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(exercisesRouter);
app.use(userRouter);
app.use("/exercises", adminRouter);

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
