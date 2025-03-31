import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../config/axiosInstance.js";
import toast from "react-hot-toast";

const MarkAttendance = () => {
  const { courseid, date } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudentsAndAttendance();
  }, [courseid, date]);

  const fetchStudentsAndAttendance = async () => {
    try {
      setLoading(true);

      // Fetch students of the course
      const studentsResponse = await API.get(
        `/api/teacher/courses/${courseid}/students`
      );
      const studentsList = studentsResponse.data.students;

      // Fetch attendance for the course on the selected date
      const attendanceResponse = await API.get(
        `/api/teacher/attendance/${courseid}/${date}`
      );
      const attendanceData = attendanceResponse.data.attendanceRecords || [];

      // Map attendance data to state
      const attendanceMap = {};
      attendanceData.forEach((record) => {
        attendanceMap[record.student_id._id] = record.status;
      });

      setStudents(studentsList);
      setAttendance(attendanceMap);
    } catch (error) {
      toast.error("Failed to fetch students and attendance.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]:
        prevAttendance[studentId] === "Present" ? "Absent" : "Present",
    }));
  };

  const saveAttendance = async () => {
    try {
      setSaving(true);

      const attendanceData = students.map((student) => ({
        student_id: student._id,
        course_id: courseid,
        date,
        status: attendance[student._id] || "Absent", // Default to Absent if not marked
      }));

      await API.post("/api/teacher/attendance/save", {
        attendance: attendanceData,
      });

      toast.success("Attendance saved successfully!");
    } catch (error) {
      toast.error("Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Mark Attendance for {date}</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-center">No students enrolled in this course.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {students.map((student, index) => (
              <div
                key={student._id}
                className={`p-4 rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  attendance[student._id] === "Present"
                    ? "bg-gradient-to-br from-green-400 to-green-600"
                    : attendance[student._id] === "Absent"
                    ? "bg-gradient-to-br from-red-400 to-red-600"
                    : "bg-gradient-to-br from-gray-300 to-gray-400"
                }`}
                onClick={() => toggleAttendance(student._id)}
              >
                {/* Roll Number Badge */}
                <div className="absolute -top-2 -left-2 bg-yellow-500 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                  {index + 1}
                </div>

                {/* Student Profile Image */}
                <div className="relative mb-3 mx-auto w-20 h-20">
                  <img
                    src={student.imageUrl || "https://via.placeholder.com/100"}
                    alt={student.name}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                  />
                  {/* Status Indicator */}
                  <div
                    className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${
                      attendance[student._id] === "Present"
                        ? "bg-green-500"
                        : attendance[student._id] === "Absent"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>

                {/* Student Details */}
                <p className="font-bold text-white text-lg">{student.name}</p>
                <p className="text-white text-opacity-90 text-sm mb-1">
                  {student.email}
                </p>

                {/* Attendance Status */}
                <div
                  className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                    attendance[student._id] === "Present"
                      ? "bg-white text-green-600"
                      : attendance[student._id] === "Absent"
                      ? "bg-white text-red-600"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {attendance[student._id] || "Click to Mark"}
                </div>
              </div>
            ))}
          </div>

          {/* Save Attendance Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={saveAttendance}
              disabled={saving}
              className="btn btn-primary px-6 py-2"
            >
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MarkAttendance;
