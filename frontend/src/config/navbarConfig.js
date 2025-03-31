const navbarConfig = {
  guest: [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ],
  admin: [
    {
      name: "Management",
      subMenu: [
        { name: "Manage Teachers", path: "/admin/teachers" },
        { name: "Manage Students", path: "/admin/students" },
        { name: "Manage Courses", path: "/admin/courses" },
      ],
    },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ],
  teacher: [
    {
      name: "Courses",
      path: "/teacher/courses",
    },
    {
      name: "Reports",
      path: "/teacher/reports",
    },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ],
  student: [
    {
      name: "Attendance",
      subMenu: [{ name: "My Attendance", path: "/student/attendance" }],
    },
    {
      name: "Courses",
      subMenu: [
        { name: "Enroll in Course", path: "/student/enroll" },
        { name: "My Course", path: "/student/my-courses" },
      ],
    },
    {
      name: "Notifications",
      subMenu: [{ name: "View Notifications", path: "/student/notifications" }],
    },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ],
};

export default navbarConfig;
