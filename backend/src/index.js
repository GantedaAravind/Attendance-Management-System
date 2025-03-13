import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import teacherRoutes from "./routes/teacher.js";
import studentRoutes from "./routes/student.js";
import utilityRoutes from "./routes/utility.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors({ origin: ["http://localhost:1234"] }));
// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser(process.env.COOKIE_SECRET)); // Use cookie-parser

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/", utilityRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Attendance Management System 👨‍🎓");
});

// Function to start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start the server only after MongoDB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

// Start the server
startServer();
