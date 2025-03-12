attendance-frontend/
│── public/
│── src/
│ ├── api/ # API service functions
│ ├── assets/ # Static assets (icons, images, etc.)
│ ├── components/ # Reusable UI components
│ │ ├── Navbar.jsx
│ ├── context/ # React Context API for global state management
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Page components
│ │ ├── Home.jsx # Introduction page with login button
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Admin/
│ │ │ ├── AddTeacher.jsx
│ │ │ ├── AddStudent.jsx
│ │ │ ├── CreateCourse.jsx
│ │ │ ├── AssignCourse.jsx
│ │ │ ├── Reports.jsx
│ │ ├── Teacher/
│ │ │ ├── MyCourses.jsx
│ │ │ ├── MarkAttendance.jsx
│ │ │ ├── ViewAttendance.jsx
│ │ │ ├── GenerateReports.jsx
│ │ ├── Student/
│ │ │ ├── MyAttendance.jsx
│ │ │ ├── Notifications.jsx
│ │ │ ├── EnrollCourse.jsx
│ ├── redux/ # Redux Toolkit slices and store setup
│ │ ├── authSlice.js
│ │ ├── teacherSlice.js
│ │ ├── studentSlice.js
│ │ ├── adminSlice.js
│ │ ├── store.js
│ ├── routes/ # Route configurations
│ │ ├── index.jsx
│ ├── styles/ # Tailwind/DaisyUI custom styles
│ ├── App.js # Main App component
│ ├── main.jsx # Entry point
│── package.json
│── tailwind.config.js
│── .env
│── README.md
