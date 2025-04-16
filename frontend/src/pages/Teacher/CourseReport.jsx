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
  CartesianGrid,
} from "recharts";
import {
  FaChartBar,
  FaChartPie,
  FaUsers,
  FaCalendarAlt,
  FaSpinner,
} from "react-icons/fa";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

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

  const calculateAverageAttendance = () => {
    if (!report?.students?.length) return 0;
    const total = report.students.reduce((sum, student) => {
      return sum + student.attended / student.total;
    }, 0);
    return Math.round((total / report.students.length) * 100);
  };

  return (
    <div className="p-5 max-w-7xl mx-auto bg-transparent">
      <div className="flex items-center gap-3 mb-6">
        <FaChartBar className="text-blue-400 text-2xl" />
        <h2 className="text-2xl font-bold text-white">
          Attendance Analytics for{" "}
          <span className="text-blue-400">{report?.course || "Course"}</span>
        </h2>
      </div>

      {loading ? (
        <LoadingAnimation />
      ) : report ? (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/70 p-4 rounded-xl shadow-md border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-900/30 rounded-full">
                  <FaUsers className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Students</p>
                  <p className="text-2xl font-bold text-white">
                    {report.students.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/70 p-4 rounded-xl shadow-md border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-900/30 rounded-full">
                  <FaCalendarAlt className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Classes</p>
                  <p className="text-2xl font-bold text-white">
                    {report.totalClasses}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/70 p-4 rounded-xl shadow-md border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-900/30 rounded-full">
                  <FaChartPie className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-white">
                    {calculateAverageAttendance()}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-gray-800/70 p-6 rounded-xl shadow-md border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <FaChartBar className="text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  Student Attendance
                </h3>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={report.students}
                    margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    />
                    <YAxis tick={{ fill: "#9CA3AF" }} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(31, 41, 55, 0.9)",
                        border: "1px solid #4B5563",
                        borderRadius: "8px",
                        padding: "12px",
                        color: "#F3F4F6",
                      }}
                    />
                    <Bar
                      dataKey="attended"
                      name="Classes Attended"
                      radius={[4, 4, 0, 0]}
                    >
                      {report.students.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#1F2937"
                          strokeWidth={1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800/70 p-6 rounded-xl shadow-lg border border-gray-600 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaChartPie className="text-purple-400 text-2xl" />
                <h3 className="text-xl font-bold text-white">
                  Student Attendance
                </h3>
              </div>

              <div className="h-[350px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {report.students.map((_, index) => {
                        const hue =
                          (index * (360 / report.students.length)) % 360;
                        return (
                          <linearGradient
                            id={`gradient-${index}`}
                            key={`gradient-${index}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor={`hsl(${hue}, 80%, 60%)`}
                            />
                            <stop
                              offset="100%"
                              stopColor={`hsl(${hue}, 100%, 45%)`}
                            />
                          </linearGradient>
                        );
                      })}
                    </defs>

                    <Pie
                      data={report.students.map((s) => ({
                        name: s.name,
                        class: s.class || "N/A",
                        value: Math.round((s.attended / s.total) * 100),
                        attended: s.attended,
                        total: s.total,
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={140}
                      innerRadius={60}
                      paddingAngle={2}
                      cornerRadius={8}
                      dataKey="value"
                      animationDuration={500}
                      animationEasing="ease-out"
                    >
                      {report.students.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient-${index})`}
                          stroke="#1F2937"
                          strokeWidth={2}
                          style={{
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))",
                            opacity: 0.95,
                          }}
                          onMouseEnter={(e) => {
                            e.target.setAttribute("stroke", "#ffffff");
                            e.target.setAttribute("stroke-width", "3");
                            e.target.setAttribute(
                              "filter",
                              "drop-shadow(0px 6px 12px rgba(0,0,0,0.4))"
                            );
                          }}
                          onMouseLeave={(e) => {
                            e.target.setAttribute("stroke", "#1F2937");
                            e.target.setAttribute("stroke-width", "2");
                            e.target.setAttribute(
                              "filter",
                              "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))"
                            );
                          }}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: "rgba(17, 24, 39, 0.97)",
                        border: "1px solid #7C3AED",
                        borderRadius: "10px",
                        padding: "16px",
                        color: "#F3F4F6",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 8px 24px rgba(124, 58, 237, 0.25)",
                      }}
                      formatter={(value, name, props) => {
                        return [
                          <div key="tooltip-content" className="space-y-2">
                            <div className="font-bold text-purple-300 text-lg">
                              {props.payload.name}
                            </div>
                            <div className="text-2xl font-bold text-white mt-1">
                              {value}%
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              ({props.payload.attended}/{props.payload.total}{" "}
                              classes)
                            </div>
                          </div>,
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p>No attendance data available for this course.</p>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
