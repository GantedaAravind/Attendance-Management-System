"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authMiddleware = function authMiddleware(req, res, next) {
  // Get the token from the request headers or cookies
  var token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided."
    });
  }
  try {
    // Verify the token
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

    // Attach the user ID and role to the request object
    req.userId = decoded.userId;
    req.role = decoded.role;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({
      error: "Invalid token"
    });
  }
};
var _default = exports["default"] = authMiddleware;