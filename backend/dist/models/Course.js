"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var courseSchema = new _mongoose["default"].Schema({
  course_name: {
    type: String,
    required: true
  },
  teacher_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Teacher"
  },
  students: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Student"
  }],
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  }
});
var _default = exports["default"] = _mongoose["default"].model("Course", courseSchema);