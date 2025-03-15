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
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    const student = new Student({ name, email, password });
    await student.save();

    res.status(201).json({ message: "Student added successfully", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student
router.delete("/delete-student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new teacher
router.post("/add-teacher", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ error: "Teacher already exists" });
    }

    const teacher = new Teacher({ name, email, password });
    await teacher.save();

    res.status(201).json({ message: "Teacher added successfully", teacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a teacher
router.delete("/delete-teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new course
router.post("/create-course", async (req, res) => {
  const { course_name, teacher_id, start_date, end_date } = req.body;

  // Validate required fields
  if (!course_name || !teacher_id || !start_date || !end_date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the teacher exists
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Validate date format
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Ensure start date is before end date
    if (startDate >= endDate) {
      return res
        .status(400)
        .json({ error: "Start date must be before end date" });
    }

    // Create the course
    const course = new Course({
      course_name,
      teacher_id,
      start_date,
      end_date,
    });
    await course.save();

    // Populate the teacher_id field before sending the response
    const populatedCourse = await Course.findById(course._id).populate(
      "teacher_id",
      "name email"
    );

    res
      .status(201)
      .json({
        message: "Course created successfully",
        course: populatedCourse,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a course
router.delete("/delete-course/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
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
