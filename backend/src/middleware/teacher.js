import Teacher from "../models/Teacher.js";

const teacherMiddleware = async (req, res, next) => {
  try {
    // Check if the user is a teacher
    const teacher = await Teacher.findById(req.userId);
    if (!teacher) {
      return res
        .status(403)
        .json({ error: "Access denied. You are not a teacher." });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default teacherMiddleware;
