import express from "express";
import Attendance from "../models/Attendance.js";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Helper function to prepare monthly attendance data
const prepareMonthlyData = (records) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyStats = {};
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    monthlyStats[key] = { present: 0, total: 0 };
  }

  // Process records
  records.forEach((record) => {
    const recordDate = new Date(record.date);
    if (recordDate >= sixMonthsAgo) {
      const key = `${
        monthNames[recordDate.getMonth()]
      } ${recordDate.getFullYear()}`;
      if (monthlyStats[key]) {
        monthlyStats[key].total++;
        if (record.status === "Present") {
          monthlyStats[key].present++;
        }
      }
    }
  });

  // Convert to chart format
  const labels = Object.keys(monthlyStats);
  const percentages = labels.map((month) => {
    const data = monthlyStats[month];
    return data.total > 0 ? Math.round((data.present / data.total) * 100) : 0;
  });

  return { labels, percentages };
};

// Helper function to prepare course-wise attendance data
const prepareCourseData = async (records) => {
  const courseStats = {};

  // Group by course
  for (const record of records) {
    const courseId = record.course_id.toString();

    if (!courseStats[courseId]) {
      const course = await Course.findById(record.course_id).select(
        "course_name"
      );
      courseStats[courseId] = {
        courseName: course.course_name,
        present: 0,
        total: 0,
      };
    }

    courseStats[courseId].total++;
    if (record.status === "Present") {
      courseStats[courseId].present++;
    }
  }

  // Convert to array format with percentages
  return Object.values(courseStats).map((course) => ({
    courseName: course.courseName,
    attendancePercentage: Math.round((course.present / course.total) * 100),
    present: course.present,
    total: course.total,
  }));
};

// Get student attendance dashboard data
router.get("/student", authMiddleware, async (req, res) => {
  try {
    // Check if user is a student
    if (req.role !== "student") {
      return res
        .status(403)
        .json({ error: "Access denied. Only students can view this data." });
    }

    const studentId = req.userId;

    // Get all attendance records for the student
    const attendanceRecords = await Attendance.find({
      student_id: studentId,
    }).sort({ date: -1 });

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    // Calculate overall statistics
    const totalClasses = attendanceRecords.length;
    const totalPresent = attendanceRecords.filter(
      (r) => r.status === "Present"
    ).length;
    const overallPercentage = Math.round((totalPresent / totalClasses) * 100);

    // Get recent records (last 5)
    const recentRecords = await Promise.all(
      attendanceRecords.slice(0, 5).map(async (record) => {
        const course = await Course.findById(record.course_id).select(
          "course_name"
        );
        return {
          courseName: course.course_name,
          date: record.date,
          status: record.status,
        };
      })
    );

    // Prepare monthly data (last 6 months)
    const monthlyData = prepareMonthlyData(attendanceRecords);

    // Prepare course-wise data
    const courseData = await prepareCourseData(attendanceRecords);

    res.json({
      success: true,
      overallPercentage,
      totalPresent,
      totalClasses,
      recentRecords,
      monthly: monthlyData,
      byCourse: courseData,
    });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message,
    });
  }
});

export default router;
