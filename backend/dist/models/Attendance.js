"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var attendanceSchema = new _mongoose["default"].Schema({
  student_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  course_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    "enum": ["Present", "Absent"],
    required: true
  }
});
var _default = exports["default"] = _mongoose["default"].model("Attendance", attendanceSchema);