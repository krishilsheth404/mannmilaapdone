const express = require("express");
const dotenv = require("dotenv").config({ path: "./config.env" });
const app = express();
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const router = require("./routes/router");
const connectDB = require("./database/db");
const cronJobs = require("./controllers/Membership");


// Initiall Set Up
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", router);

// Connecting to Database
connectDB();

cronJobs;

// Starting the serveron Localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on Port ${PORT}`.yellow.bold);
});
