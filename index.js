const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");

mongoose.connect("");

const app = express();
app.use(express.json());

app.use("./user", userRouter);
app.use("./course", courseRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
