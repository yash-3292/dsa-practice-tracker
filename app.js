const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");

// PUBLIC ROUTES FIRST
app.use("/", authRoutes);

// PROTECTED ROUTES AFTER
app.use("/", problemRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
