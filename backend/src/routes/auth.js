import express from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Helper function to find user by role
const findUserByRole = async (email, role) => {
  switch (role) {
    case "admin":
      return await Admin.findOne({ email });
    case "teacher":
      return await Teacher.findOne({ email });
    case "student":
      return await Student.findOne({ email });
    default:
      return null;
  }
};

// Helper function to validate user input
const validateInput = (name, email, password, role) => {
  if (!name || !email || !password || !role) {
    return { error: "All fields are required" };
  }

  if (!validator.isEmail(email)) {
    return { error: "Invalid email" };
  }

  if (!validator.isLength(password, { min: 6 })) {
    return { error: "Password must be at least 6 characters long" };
  }

  if (!["admin", "teacher", "student"].includes(role)) {
    return { error: "Invalid role" };
  }

  return null;
};

// Register a new user (Admin, Teacher, or Student)
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate input
    const validationError = validateInput(name, email, password, role);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    // Check if the user already exists
    const existingUser = await findUserByRole(email, role);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user based on the role
    let user;
    if (role === "admin") {
      user = new Admin({ name, email, password });
    } else if (role === "teacher") {
      user = new Teacher({ name, email, password });
    } else if (role === "student") {
      user = new Student({ name, email, password });
    }

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, role);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      signed: true,
      secure: false,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login a user (Admin, Teacher, or Student)
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Find the user based on the role
    const user = await findUserByRole(email, role);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Verify the password
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id, role);

    // Set the token in a cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      signed: true,
      secure: false,
    });

    res
      .status(200)
      .json({ message: "Login successful", role, user: user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout a user
router.post("/logout", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logout successful" });
});

export default router;
