import express from "express";
import authMiddleware from "../middleware/auth.js";
import studentMiddleware from "../middleware/student.js"; // Middleware to check if the user is a student
import Attendance from "../models/Attendance.js";
import Notification from "../models/Notification.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";

const router = express.Router();

// Middleware to ensure the user is a student
router.use(authMiddleware); // Ensure the user is authenticated
router.use(studentMiddleware); // Ensure the user is a student

// View attendance records for the logged-in student
router.get("/attendance", async (req, res) => {
  try {
    // Fetch attendance records for the logged-in student
    const attendanceRecords = await Attendance.find({ student_id: req.userId })
      .populate("course_id", "course_name")
      .select("course_id date status");

    res.status(200).json({ attendanceRecords });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View notifications for the logged-in student
router.get("/notifications", async (req, res) => {
  try {
    // Fetch notifications for the logged-in student
    const notifications = await Notification.find({
      student_id: req.userId,
    }).select("message date");

    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses enrolled by the logged-in student
router.get("/courses", async (req, res) => {
  const { userId } = req; // Extract userId from authentication middleware

  try {
    // Find the student and populate the courses field with teacher details
    const student = await Student.findById(userId).populate({
      path: "courses",
      select: "course_name _id teacher_id",
      populate: {
        path: "teacher_id",
        select: "name email", // Fetch only the teacher's name and email
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ courses: student.courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll a student in a course
router.post("/enroll/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req; // Assuming userId is extracted from auth middleware

  try {
    // Check if the student exists
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the student is already enrolled in the course
    if (course.students.includes(userId)) {
      return res
        .status(400)
        .json({ error: "Student is already enrolled in this course" });
    }

    // Add the course to the student's courses array
    student.courses.push(courseId);
    await student.save();

    // Add the student to the course's students array
    course.students.push(userId);
    await course.save();

    res.status(200).json({ message: "Enrolled successfully", student, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
