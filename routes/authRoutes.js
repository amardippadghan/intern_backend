const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import the user schema

const router = express.Router();
const jwtKey = "amar";

router.post("/signup", async (req, res) => {
  const { fullName, email, number, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existingnumber = await User.findOne({ number });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    } else if (existingnumber) {
      return res.status(409).json({ error: "Number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullName,
      email: email,
      number: number,
      password: hashedPassword,
      userType: userType,
    });

    const createdUser = await newUser.save();
    const token = jwt.sign({ email: createdUser.email }, jwtKey);

    // Return the token and created user's email in the response
    res.json({
      userId: createdUser._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email }, jwtKey);

    // Include user data in the response with modified userId (_id)
    res.json({
      userId: user._id, // Using user._id as userId
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
