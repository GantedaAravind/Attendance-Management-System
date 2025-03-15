import express from "express";
import authMiddleware from "../middleware/auth.js";
import teacherMiddleware from "../middleware/teacher.js"; // Middleware to check if the user is a teacher
import Attendance from "../models/Attendance.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";

const router = express.Router();

// Middleware to ensure the user is a teacher
router.use(authMiddleware); // Ensure the user is authenticated
router.use(teacherMiddleware); // Ensure the user is a teacher

// Get all courses assigned to the logged-in teacher
// Get all courses taught by the logged-in teacher
router.get("/my-courses", async (req, res) => {
  const { userId } = req; // Extract teacher ID from authentication middleware

  try {
    // Find courses where the logged-in teacher is assigned
    const courses = await Course.find({ teacher_id: userId }).populate(
      "students",
      "name email"
    );

    if (!courses.length) {
      return res
        .status(404)
        .json({ error: "No courses found for this teacher" });
    }

    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark attendance for a course
router.post("/mark-attendance", async (req, res) => {
  const { course_id, date, attendance } = req.body;

  try {
    // Validate input
    if (!course_id || !date || !attendance || !Array.isArray(attendance)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if the course exists and is assigned to the teacher
    const course = await Course.findOne({
      _id: course_id,
      teacher_id: req.userId, // Ensure the course is assigned to the logged-in teacher
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Save attendance records
    for (const record of attendance) {
      const { student_id, status } = record;

      // Check if the student exists and is enrolled in the course
      const student = await Student.findById(student_id).populate("courses");
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      if (!student.courses || !student.courses.includes(course_id)) {
        return res
          .status(400)
          .json({ error: "Student not enrolled in the course" });
      }

      // Create or update the attendance record
      await Attendance.findOneAndUpdate(
        { student_id, course_id, date },
        { status },
        { upsert: true, new: true }
      );
    }

    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View attendance for a course on a specific date
router.get("/attendance/:courseId/:date", async (req, res) => {
  const { courseId, date } = req.params;

  try {
    // Check if the course exists and is assigned to the teacher
    const course = await Course.findOne({
      _id: courseId,
      teacher_id: req.userId, // Ensure the course is assigned to the logged-in teacher
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Fetch attendance records for the course on the given date
    const attendanceRecords = await Attendance.find({
      course_id: courseId,
      date: new Date(date), // Ensure date matches exactly
    })
      .populate("student_id", "name email imageUrl") // Fetch student details
      .select("student_id date status");

    res.status(200).json({ attendanceRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate attendance report for a course
router.get("/reports/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    // Check if the course exists and is assigned to the teacher
    const course = await Course.findOne({
      _id: courseId,
      teacher_id: req.userId, // Ensure the course is assigned to the logged-in teacher
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Fetch attendance records for the course
    const attendanceRecords = await Attendance.find({ course_id: courseId })
      .populate("student_id", "name email")
      .select("student_id date status");

    // Calculate attendance summary
    const summary = attendanceRecords.reduce((acc, record) => {
      const studentId = record.student_id._id.toString();
      if (!acc[studentId]) {
        acc[studentId] = {
          name: record.student_id.name,
          email: record.student_id.email,
          present: 0,
          absent: 0,
        };
      }

      if (record.status === "Present") {
        acc[studentId].present++;
      } else if (record.status === "Absent") {
        acc[studentId].absent++;
      }

      return acc;
    }, {});

    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    // Fetch the course and populate teacher details
    const course = await Course.findById(courseId).populate(
      "teacher_id",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.get("/courses/:courseId/students", async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find the course and populate students
    const course = await Course.findById(courseId).populate("students");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ students: course.students });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
