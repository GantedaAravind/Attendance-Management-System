import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../config/axiosInstance.js";
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

const ViewAttendance = () => {
  const { courseId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [courseId]);

  const fetchReport = async () => {
    try {
      const response = await API.get(`/api/teacher/reports/${courseId}`);
      setReport(response.data.report);
    } catch (error) {
      toast.error("Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Attendance Report</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : report ? (
        <div>
          <h3 className="text-lg font-semibold">Course: {report.course}</h3>
          <p>Total Classes: {report.totalClasses}</p>
          <div className="flex  gap-10 w-full">
            {/* 1️⃣ Bar Chart - Student Attendance */}
            <div className="mt-6 w-1/2">
              <h3 className="text-lg  font-semibold">
                Student Attendance Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={report.students}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="attended"
                    fill="#4CAF50"
                    name="Classes Attended"
                  />
                  <Bar dataKey="total" fill="#FF5733" name="Total Classes" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 2️⃣ Pie Chart - Attendance Percentage */}
            <div className="mt-6 w-1/2 ">
              <h3 className="text-lg font-semibold">Attendance Percentage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={report.students.map((s) => ({
                      name: s.name,
                      value: (s.attended / s.total) * 100,
                    }))}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {report.students.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          ["#4CAF50", "#FF5733", "#FFC107", "#2196F3"][
                            index % 4
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <p>No attendance data available.</p>
      )}
    </div>
  );
};

export default ViewAttendance;
