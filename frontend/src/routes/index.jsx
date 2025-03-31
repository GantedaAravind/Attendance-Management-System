import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

// Admin Pages
import ManageTeacher from "../pages/Admin/ManageTeacher";
import ManageStudent from "../pages/Admin/ManageStudent";
import ManageCourse from "../pages/Admin/ManageCourse";
import AssignCourse from "../pages/Admin/AssignCourse";

// Teacher Pages
import MyCourses from "../pages/Teacher/MyCourses";
import MarkAttendance from "../pages/Teacher/MarkAttendance";
import DateSelector from "../pages/Teacher/DateSelector";
import Reports from "../pages/Teacher/Reports";
import CourseReport from "../pages/Teacher/CourseReport";

// Student Pages
import MyStudentCourses from "../pages/Student/MyCourses";
import MyAttendance from "../pages/Student/MyAttendance";
import Notifications from "../pages/Student/Notifications";
import EnrollCourse from "../pages/Student/EnrollCourse";

import ProtectedRoute from "../components/ProtectedRoute"; // For role-based access
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // Admin Routes
      {
        path: "admin/teachers",
        element: (
          <ProtectedRoute role="admin">
            <ManageTeacher />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/students",
        element: (
          <ProtectedRoute role="admin">
            <ManageStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/courses",
        element: (
          <ProtectedRoute role="admin">
            <ManageCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/assign-course",
        element: (
          <ProtectedRoute role="admin">
            <AssignCourse />
          </ProtectedRoute>
        ),
      },

      // Teacher Routes
      {
        path: "teacher/courses",
        element: (
          <ProtectedRoute role="teacher">
            <MyCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/courses/:courseid/date",
        element: (
          <ProtectedRoute role="teacher">
            <DateSelector />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/courses/:courseid/date/:date/mark-attendance/",
        element: (
          <ProtectedRoute role="teacher">
            <MarkAttendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/reports/:courseId",
        element: (
          <ProtectedRoute role="teacher">
            <CourseReport />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/reports",
        element: (
          <ProtectedRoute role="teacher">
            <Reports />
          </ProtectedRoute>
        ),
      },

      // Student Routes
      {
        path: "student/attendance",
        element: (
          <ProtectedRoute role="student">
            <MyAttendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "student/my-courses",
        element: (
          <ProtectedRoute role="student">
            <MyStudentCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: "student/enroll",
        element: (
          <ProtectedRoute role="student">
            <EnrollCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: "student/notifications",
        element: (
          <ProtectedRoute role="student">
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
