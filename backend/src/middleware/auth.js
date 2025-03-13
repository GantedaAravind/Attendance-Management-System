import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers or cookies
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied. No token provided.", token: token });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID and role to the request object
    req.userId = decoded.userId;
    req.role = decoded.role;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
