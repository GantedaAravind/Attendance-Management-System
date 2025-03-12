"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var notificationSchema = new _mongoose["default"].Schema({
  student_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var _default = exports["default"] = _mongoose["default"].model("Notification", notificationSchema);