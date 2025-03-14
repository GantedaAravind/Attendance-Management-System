"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Attendance = _interopRequireDefault(require("../models/Attendance.js"));
var _Teacher = _interopRequireDefault(require("../models/Teacher.js"));
var _Student = _interopRequireDefault(require("../models/Student.js"));
var _Course = _interopRequireDefault(require("../models/Course.js"));
var _auth = _interopRequireDefault(require("../middleware/auth.js"));
var _admin = _interopRequireDefault(require("../middleware/admin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Middleware to check if the user is an admin

var router = _express["default"].Router();

// Middleware to ensure the user is an admin
router.use(_auth["default"]); // Ensure the user is authenticated
router.use(_admin["default"]); // Ensure the user is an admin
// Add a new student
router.post("/add-student", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, email, password, imageUrl, existingStudent, student;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, imageUrl = _req$body.imageUrl;
          _context.prev = 1;
          _context.next = 4;
          return _Student["default"].findOne({
            email: email
          });
        case 4:
          existingStudent = _context.sent;
          if (!existingStudent) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Student already exists"
          }));
        case 7:
          student = new _Student["default"]({
            name: name,
            email: email,
            password: password,
            imageUrl: imageUrl
          });
          _context.next = 10;
          return student.save();
        case 10:
          res.status(201).json({
            message: "Student added successfully",
            student: student
          });
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: _context.t0.message
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Delete a student
router["delete"]("/delete-student/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var student;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Student["default"].findByIdAndDelete(req.params.id);
        case 3:
          student = _context2.sent;
          if (student) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            error: "Student not found"
          }));
        case 6:
          res.status(200).json({
            message: "Student deleted successfully"
          });
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Add a new teacher
router.post("/add-teacher", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, name, email, password, imageUrl, existingTeacher, teacher;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, imageUrl = _req$body2.imageUrl;
          _context3.prev = 1;
          _context3.next = 4;
          return _Teacher["default"].findOne({
            email: email
          });
        case 4:
          existingTeacher = _context3.sent;
          if (!existingTeacher) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "Teacher already exists"
          }));
        case 7:
          teacher = new _Teacher["default"]({
            name: name,
            email: email,
            password: password,
            imageUrl: imageUrl
          });
          _context3.next = 10;
          return teacher.save();
        case 10:
          res.status(201).json({
            message: "Teacher added successfully",
            teacher: teacher
          });
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            error: _context3.t0.message
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 13]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// Delete a teacher
router["delete"]("/delete-teacher/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var teacher;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Teacher["default"].findByIdAndDelete(req.params.id);
        case 3:
          teacher = _context4.sent;
          if (teacher) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: "Teacher not found"
          }));
        case 6:
          res.status(200).json({
            message: "Teacher deleted successfully"
          });
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: _context4.t0.message
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// Create a new course
router.post("/create-course", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body3, course_name, teacher_id, start_date, end_date, teacher, startDate, endDate, course, populatedCourse;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, course_name = _req$body3.course_name, teacher_id = _req$body3.teacher_id, start_date = _req$body3.start_date, end_date = _req$body3.end_date; // Validate required fields
          if (!(!course_name || !teacher_id || !start_date || !end_date)) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "All fields are required"
          }));
        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return _Teacher["default"].findById(teacher_id);
        case 6:
          teacher = _context5.sent;
          if (teacher) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: "Teacher not found"
          }));
        case 9:
          // Validate date format
          startDate = new Date(start_date);
          endDate = new Date(end_date);
          if (!(isNaN(startDate) || isNaN(endDate))) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "Invalid date format"
          }));
        case 13:
          if (!(startDate >= endDate)) {
            _context5.next = 15;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "Start date must be before end date"
          }));
        case 15:
          // Create the course
          course = new _Course["default"]({
            course_name: course_name,
            teacher_id: teacher_id,
            start_date: start_date,
            end_date: end_date
          });
          _context5.next = 18;
          return course.save();
        case 18:
          _context5.next = 20;
          return _Course["default"].findById(course._id).populate("teacher_id", "name email");
        case 20:
          populatedCourse = _context5.sent;
          res.status(201).json({
            message: "Course created successfully",
            course: populatedCourse
          });
          _context5.next = 27;
          break;
        case 24:
          _context5.prev = 24;
          _context5.t0 = _context5["catch"](3);
          res.status(500).json({
            error: _context5.t0.message
          });
        case 27:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 24]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

// Delete a course
router["delete"]("/delete-course/:id", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var course;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Course["default"].findByIdAndDelete(req.params.id);
        case 3:
          course = _context6.sent;
          if (course) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            error: "Course not found"
          }));
        case 6:
          res.status(200).json({
            message: "Course deleted successfully"
          });
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: _context6.t0.message
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

// Assign a course to a teacher
router.put("/assign-course", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body4, course_id, teacher_id, course, teacher;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body4 = req.body, course_id = _req$body4.course_id, teacher_id = _req$body4.teacher_id;
          _context7.prev = 1;
          _context7.next = 4;
          return _Course["default"].findById(course_id);
        case 4:
          course = _context7.sent;
          _context7.next = 7;
          return _Teacher["default"].findById(teacher_id);
        case 7:
          teacher = _context7.sent;
          if (!(!course || !teacher)) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            error: "Course or teacher not found"
          }));
        case 10:
          // Assign the course to the teacher
          course.teacher_id = teacher_id;
          _context7.next = 13;
          return course.save();
        case 13:
          res.status(200).json({
            message: "Course assigned successfully",
            course: course
          });
          _context7.next = 19;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json({
            error: _context7.t0.message
          });
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 16]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.get("/dashboard", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var totalStudents, totalTeachers, totalCourses, totalAttendance, attendanceByCourse, attendanceDistribution, recentAttendance;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _Student["default"].countDocuments();
        case 3:
          totalStudents = _context8.sent;
          _context8.next = 6;
          return _Teacher["default"].countDocuments();
        case 6:
          totalTeachers = _context8.sent;
          _context8.next = 9;
          return _Course["default"].countDocuments();
        case 9:
          totalCourses = _context8.sent;
          _context8.next = 12;
          return _Attendance["default"].countDocuments();
        case 12:
          totalAttendance = _context8.sent;
          _context8.next = 15;
          return _Attendance["default"].aggregate([{
            $group: {
              _id: "$course_id",
              attendanceCount: {
                $sum: 1
              }
            }
          }, {
            $lookup: {
              from: "courses",
              localField: "_id",
              foreignField: "_id",
              as: "course"
            }
          }, {
            $unwind: "$course"
          }, {
            $project: {
              courseName: "$course.name",
              attendanceCount: 1
            }
          }]);
        case 15:
          attendanceByCourse = _context8.sent;
          _context8.next = 18;
          return _Attendance["default"].aggregate([{
            $group: {
              _id: "$status",
              count: {
                $sum: 1
              }
            }
          }]).then(function (data) {
            return data.map(function (item) {
              return {
                name: item._id,
                value: item.count
              };
            });
          });
        case 18:
          attendanceDistribution = _context8.sent;
          _context8.next = 21;
          return _Attendance["default"].find().sort({
            date: -1
          }).limit(5).populate("student_id", "name").populate("course_id", "name").select("student_id course_id date status");
        case 21:
          recentAttendance = _context8.sent;
          res.status(200).json({
            totalStudents: totalStudents,
            totalTeachers: totalTeachers,
            totalCourses: totalCourses,
            totalAttendance: totalAttendance,
            attendanceByCourse: attendanceByCourse,
            attendanceDistribution: attendanceDistribution,
            recentAttendance: recentAttendance.map(function (record) {
              return {
                studentName: record.student_id.name,
                courseName: record.course_id.name,
                date: record.date.toISOString().split("T")[0],
                status: record.status
              };
            })
          });
          _context8.next = 28;
          break;
        case 25:
          _context8.prev = 25;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            error: "Failed to fetch dashboard data"
          });
        case 28:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 25]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

// Generate campus-wide attendance reports
router.get("/reports", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var attendanceRecords;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _Attendance["default"].find().populate("student_id", "name email").populate("course_id", "course_name");
        case 3:
          attendanceRecords = _context9.sent;
          res.status(200).json({
            attendanceRecords: attendanceRecords
          });
          _context9.next = 10;
          break;
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            error: _context9.t0.message
          });
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;