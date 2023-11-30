
const express = require("express");
const router = express.Router();
const Employer = require("../models/employer");

// POST - Create an employer
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the userId already exists
    const existingEmployer = await Employer.findOne({ userId });

    if (existingEmployer) {
      return res.status(400).json({ message: "User ID already exists" });
    }

    const createdEmployer = await Employer.create(req.body);
    res.status(201).json(createdEmployer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET - Get all employers
router.get("/", async (req, res) => {
  try {
    const employers = await Employer.find();
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Get a specific employer by ID
router.get("/:id", async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (employer) {
      res.status(200).json(employer);
    } else {
      res.status(404).json({ message: "Employer not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update an employer by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEmployer) {
      res.status(200).json(updatedEmployer);
    } else {
      res.status(404).json({ message: "Employer not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete an employer by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployer = await Employer.findByIdAndDelete(req.params.id);
    if (deletedEmployer) {
      res.status(200).json({ message: "Employer deleted" });
    } else {
      res.status(404).json({ message: "Employer not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
