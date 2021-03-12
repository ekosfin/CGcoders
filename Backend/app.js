const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const loginRouter = require("./routes/login");
const dataRouter = require("./routes/data");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/../Frontend/build")));

app.use("/jwt", loginRouter);
app.use("/data", dataRouter);

//react website
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "/../Frontend/index.html"));
});

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something bad happened!");
});

app.listen(process.env.PORT);
console.log("Running backend on port: " + process.env.PORT);
