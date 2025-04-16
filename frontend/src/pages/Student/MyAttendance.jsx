import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API from "../../config/axiosInstance";
import LoadingAnimation from "../../components/LoadingAnimation";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const MyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await API.get("/api/attendance/student");

        if (response.data?.success) {
          setAttendanceData(response.data);
        } else {
          throw new Error("Failed to fetch attendance data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) return <LoadingAnimation />;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!attendanceData)
    return <div className="text-center py-8">No attendance data available</div>;

  // Prepare data for Recharts
  const monthlyChartData = attendanceData.monthly.labels.map(
    (label, index) => ({
      name: label,
      attendance: attendanceData.monthly.percentages[index],
    })
  );

  const overallPieData = [
    { name: "Present", value: attendanceData.totalPresent },
    {
      name: "Absent",
      value: attendanceData.totalClasses - attendanceData.totalPresent,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        My Attendance Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Overall Stats */}
        <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Overall Attendance
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-4xl font-bold text-purple-300">
                {attendanceData.overallPercentage}%
              </p>
              <p className="text-gray-300 mt-2">
                {attendanceData.totalPresent} present out of{" "}
                {attendanceData.totalClasses} classes
              </p>
            </div>
            <div className="w-full md:w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {overallPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#4ade80" : "#f87171"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(17, 24, 39, 0.9)",
                      border: "1px solid #4B5563",
                      borderRadius: "8px",
                      padding: "12px",
                      color: "#F3F4F6",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Recent Attendance
          </h2>
          <ul className="space-y-3">
            {attendanceData.recentRecords.map((record, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-700 pb-2"
              >
                <div>
                  <p className="font-medium text-white">{record.courseName}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    record.status === "Present"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {record.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Monthly Attendance Chart */}
      <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Monthly Attendance Trend
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                tick={{ fill: "#F3F4F6" }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#9CA3AF"
                tick={{ fill: "#F3F4F6" }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(17, 24, 39, 0.9)",
                  border: "1px solid #4B5563",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#F3F4F6",
                  backdropFilter: "blur(4px)",
                }}
                formatter={(value) => [`${value}%`, "Attendance"]}
              />
              <Legend />
              <Bar
                dataKey="attendance"
                name="Attendance %"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course-wise Attendance */}
      {attendanceData.byCourse && attendanceData.byCourse.length > 0 && (
        <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Course-wise Attendance
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData.byCourse}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="attendancePercentage"
                  nameKey="courseName"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {attendanceData.byCourse.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(17, 24, 39, 0.9)",
                    border: "1px solid #4B5563",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#F3F4F6",
                    backdropFilter: "blur(4px)",
                  }}
                  formatter={(value) => [`${value}%`, "Attendance"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAttendance;
