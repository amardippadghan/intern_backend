const express = require("express");
const User = require("../models/user"); // Import the user schema
const jwt = require("jsonwebtoken");


const router = express.Router();
const jwtKey = "amar";

// Middleware to check JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.query.token; // Assuming the token is sent as a query parameter

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized: Token not provided" });
//   }

//   jwt.verify(token, jwtKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }
//     req.user = decoded;
//     next();
//   });
// };


router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedFields = req.body;

  try {
    // Update user only if the token is valid
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id",  async (req, res) => {
  const userId = req.params.id;

  try {
    // Delete user only if the token is valid
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
