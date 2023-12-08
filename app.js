const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const employerRoutes = require("./routes/employerRoutes");



mongoose
  .connect(
    "mongodb+srv://amardippadghan2:admin123@cluster0.5avn1xf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // Mount authentication routes
app.use("/users", userRoutes); // Mount user-related routes
app.use("/employers", employerRoutes); // Mount employer-related routes"

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/");
});
