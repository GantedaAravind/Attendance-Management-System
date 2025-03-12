import Admin from "../models/Admin.js";

const adminMiddleware = async (req, res, next) => {
  try {
    // Check if the user is an admin
    const admin = await Admin.findById(req.userId);
    if (!admin) {
      return res
        .status(403)
        .json({ error: "Access denied. You are not an admin." });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default adminMiddleware;
