const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const loginRouter = require("./routes/login");
const dataRouter = require("./routes/data");
const editRouter = require("./routes/edit");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

app.use("/jwt", loginRouter);
app.use("/data", dataRouter);
app.use("/edit", editRouter);

//react website
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something bad happened!");
});

const server = app.listen(process.env.PORT || 80, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`App listening at ${host}:${port}`);
});
