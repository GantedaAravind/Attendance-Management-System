import express from "express";
import authMiddleware from "../middleware/auth.js";
import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";

const router = express.Router();

// Middleware to ensure the user is authenticated
router.use(authMiddleware);

// Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find().select("name email");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all teachers
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find().select("name email");
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().select("course_name teacher_id");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile", async (req, res) => {
  const { userId, role } = req;

  try {
    let user;

    // Fetch user profile based on role
    switch (role) {
      case "admin":
        user = await Admin.findById(userId).select("-password").lean();
        break;
      case "teacher":
        user = await Teacher.findById(userId).select("-password").lean();
        break;
      case "student":
        user = await Student.findById(userId).select("-password").lean();
        break;
      default:
        return res.status(400).json({ error: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role; // Add role to the user object
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get students enrolled in a specific course
router.get("/:courseId/students", async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find students whose `courses` array contains the `courseId`
    const students = await Student.find({ courses: courseId }).select(
      "name email _id"
    );

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
