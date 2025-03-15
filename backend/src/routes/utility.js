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
    const students = await Student.find().select("-password");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all teachers
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses with teacher details
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher_id"); // Populating teacher_id with name and email

    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "name email role imageUrl"
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    let extraData = {};

    if (user.role === "teacher") {
      const courses = await Course.find({ teacher_id: user._id }).select(
        "name"
      );
      extraData = { courses };
    } else if (user.role === "student") {
      const courses = await Course.find({ students: user._id }).select("name");
      const attendanceRecords = await Attendance.find({ student_id: user._id });
      const totalClasses = attendanceRecords.length;
      const attendedClasses = attendanceRecords.filter(
        (r) => r.status === "Present"
      ).length;
      extraData = {
        courses,
        attendancePercentage: totalClasses
          ? ((attendedClasses / totalClasses) * 100).toFixed(2)
          : "N/A",
      };
    }

    res.status(200).json({ user: { ...user.toObject(), ...extraData } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Get students enrolled in a specific course
router.get("/:courseId/students", async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find students whose `courses` array contains the `courseId`
    const students = await Student.find({ courses: courseId }).select(
      "-password"
    );

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
