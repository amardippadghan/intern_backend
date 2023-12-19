const express = require("express");
const User = require("../models/user"); // Import the user schema
const jwt = require("jsonwebtoken");
const StudentInfo = require("../models/student");



const router = express.Router();
const jwtKey = "amar";

// Middleware to check JWT token
const verifyToken = (req, res, next) => {
  const token = req.query.token; // Assuming the token is sent as a query parameter

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};


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

router.get("/studentinfo" , async(req,res)=>{
   try {
    const allStudents = await StudentInfo.find();
    res.json(allStudents);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve students" });
  }

})

router.post("/studentinfo" , async(req,res)=>{
  try {
    const newStudent = await StudentInfo.create(req.body);
    res.json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Could not create student" });
  }

}
)
router.get("/studentinfo/findByUserID/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const students = await StudentInfo.find({ userID });

    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ error: "No students found for this user ID" });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/studentinfo/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedFields = req.body;

  try {
    const existingStudent = await StudentInfo.findById(studentId);

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update PersonalInfo fields if present in the request body
    if (updatedFields.PersonalInfo) {
      Object.assign(existingStudent.PersonalInfo, updatedFields.PersonalInfo);
    }

    // Update EducationalDetails fields if present in the request body
    if (updatedFields.EducationalDetails) {
      existingStudent.EducationalDetails = updatedFields.EducationalDetails;
    }

    // Update TechnicalSkills fields if present in the request body
    if (updatedFields.TechnicalSkills) {
      Object.assign(
        existingStudent.TechnicalSkills,
        updatedFields.TechnicalSkills
      );

      
    }

    // Save the updated student document
    const updatedStudent = await existingStudent.save();

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});









module.exports = router;
