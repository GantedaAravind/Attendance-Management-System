import express from "express";
import Attendance from "../models/Attendance.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js"; // Middleware to check if the user is an admin

const router = express.Router();

// Middleware to ensure the user is an admin
router.use(authMiddleware); // Ensure the user is authenticated
router.use(adminMiddleware); // Ensure the user is an admin

// Add a new student
router.post("/add-student", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    // Create a new student (password will be hashed by pre-save middleware)
    const student = new Student({ name, email, password });
    await student.save();

    res.status(201).json({ message: "Student added successfully", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new teacher
router.post("/add-teacher", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the teacher already exists
    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(400).json({ error: "Teacher already exists" });
    }

    // Create a new teacher (password will be hashed by pre-save middleware)
    const teacher = new Teacher({ name, email, password });
    await teacher.save();

    res.status(201).json({ message: "Teacher added successfully", teacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new course
router.post("/create-course", async (req, res) => {
  const { course_name, teacher_id } = req.body;
  try {
    // Check if the teacher exists
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Create a new course
    const course = new Course({ course_name, teacher_id });
    await course.save();

    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign a course to a teacher
router.put("/assign-course", async (req, res) => {
  const { course_id, teacher_id } = req.body;

  try {
    // Check if the course and teacher exist
    const course = await Course.findById(course_id);
    const teacher = await Teacher.findById(teacher_id);

    if (!course || !teacher) {
      return res.status(404).json({ error: "Course or teacher not found" });
    }

    // Assign the course to the teacher
    course.teacher_id = teacher_id;
    await course.save();

    res.status(200).json({ message: "Course assigned successfully", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate campus-wide attendance reports
router.get("/reports", async (req, res) => {
  try {
    // Fetch all attendance records
    const attendanceRecords = await Attendance.find()
      .populate("student_id", "name email")
      .populate("course_id", "course_name");

    res.status(200).json({ attendanceRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
