const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
  },
  userType: {
    type: String,
    enum: ["admin", "employer", "student"],
    required: true,
  },
  // Add any other fields specific to your application
});

const User = mongoose.model("User", userSchema);
module.exports = User;
