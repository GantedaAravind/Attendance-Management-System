import { useEffect, useState } from "react";
import API from "../config/axiosInstance.js";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await API.get("/api/admin/dashboard");

      setStats(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : stats ? (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-500 text-white text-center rounded-lg">
              <h3 className="text-lg font-bold">{stats.totalStudents}</h3>
              <p className="text-sm">Total Students</p>
            </div>
            <div className="p-4 bg-green-500 text-white text-center rounded-lg">
              <h3 className="text-lg font-bold">{stats.totalTeachers}</h3>
              <p className="text-sm">Total Teachers</p>
            </div>
            <div className="p-4 bg-yellow-500 text-white text-center rounded-lg">
              <h3 className="text-lg font-bold">{stats.totalCourses}</h3>
              <p className="text-sm">Total Courses</p>
            </div>
            <div className="p-4 bg-red-500 text-white text-center rounded-lg">
              <h3 className="text-lg font-bold">{stats.totalAttendance}</h3>
              <p className="text-sm">Total Attendance Records</p>
            </div>
          </div>

          {/* Bar Chart - Attendance by Course */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Attendance by Course</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.attendanceByCourse}>
                <XAxis dataKey="courseName" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="attendanceCount"
                  fill="#4CAF50"
                  name="Attendance"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Attendance Distribution */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">
              Attendance Percentage Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.attendanceDistribution}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {stats.attendanceDistribution.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        ["#4CAF50", "#FF5733", "#FFC107", "#2196F3"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              Recent Attendance Records
            </h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Student</th>
                  <th className="p-2">Course</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAttendance.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="p-2">{record.studentName}</td>
                    <td className="p-2">{record.courseName}</td>
                    <td className="p-2">{record.date}</td>
                    <td
                      className={`p-2 ${
                        record.status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
