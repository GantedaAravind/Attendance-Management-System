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

router.post("/attendance/save", async (req, res) => {
  try {
    const { attendance } = req.body;

    // Insert or update attendance records
    for (const record of attendance) {
      await Attendance.findOneAndUpdate(
        {
          student_id: record.student_id,
          course_id: record.course_id,
          date: record.date,
        },
        { status: record.status },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Attendance saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save attendance" });
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

router.get("/reports/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find course assigned to teacher
    const course = await Course.findOne({
      _id: courseId,
      teacher_id: req.userId,
    });
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Fetch attendance records
    const attendanceRecords = await Attendance.find({ course_id: courseId })
      .populate("student_id", "name email")
      .select("student_id date status");

    // Process attendance data
    const studentAttendance = {};
    attendanceRecords.forEach(({ student_id, status }) => {
      if (!studentAttendance[student_id._id]) {
        studentAttendance[student_id._id] = {
          name: student_id.name,
          attended: 0,
          total: 0,
        };
      }
      studentAttendance[student_id._id].total += 1;
      if (status === "Present") studentAttendance[student_id._id].attended += 1;
    });

    // Generate report data
    const report = {
      course: course.name,
      totalClasses: attendanceRecords.length,
      students: Object.values(studentAttendance).map((student) => ({
        ...student,
        percentage: ((student.attended / student.total) * 100).toFixed(2) + "%",
      })),
    };

    res.status(200).json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
