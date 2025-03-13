import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

// Admin Pages
import AddTeacher from "../pages/Admin/AddTeacher";
import AddStudent from "../pages/Admin/AddStudent";
import CreateCourse from "../pages/Admin/CreateCourse";
import AssignCourse from "../pages/Admin/AssignCourse";
import Reports from "../pages/Admin/Reports";

// Teacher Pages
import MyCourses from "../pages/Teacher/MyCourses";
import MarkAttendance from "../pages/Teacher/MarkAttendance";
import ViewAttendance from "../pages/Teacher/ViewAttendance";
import GenerateReports from "../pages/Teacher/GenerateReports";

// Student Pages
import MyAttendance from "../pages/Student/MyAttendance";
import Notifications from "../pages/Student/Notifications";
import EnrollCourse from "../pages/Student/EnrollCourse";

import ProtectedRoute from "../components/ProtectedRoute"; // For role-based access

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
        path: "admin/add-teacher",
        element: (
          <ProtectedRoute role="admin">
            <AddTeacher />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/add-student",
        element: (
          <ProtectedRoute role="admin">
            <AddStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create-course",
        element: (
          <ProtectedRoute role="admin">
            <CreateCourse />
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
      {
        path: "admin/reports",
        element: (
          <ProtectedRoute role="admin">
            <Reports />
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
        path: "teacher/mark-attendance",
        element: (
          <ProtectedRoute role="teacher">
            <MarkAttendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/view-attendance",
        element: (
          <ProtectedRoute role="teacher">
            <ViewAttendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/reports",
        element: (
          <ProtectedRoute role="teacher">
            <GenerateReports />
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
    ],
  },
]);

export default router;
