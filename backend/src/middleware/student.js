import Student from "../models/Student.js";

const studentMiddleware = async (req, res, next) => {
  try {
    // Check if the user is a student
    const student = await Student.findById(req.userId);
    if (!student) {
      return res
        .status(403)
        .json({ error: "Access denied. You are not a student." });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default studentMiddleware;
