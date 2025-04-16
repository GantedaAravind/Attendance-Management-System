import React, { useEffect, useState } from "react";
import API from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import notfound_animation from "../../assets/not_found.json";
import { FaChalkboardTeacher } from "react-icons/fa";
import LoadingAnimation from "../../components/LoadingAnimation";
import {
  FaBook,
  FaUsers,
  FaCalendarAlt,
  FaCalendarCheck,
  FaClock,
  FaChalkboardTeacher,
  FaPercent,
} from "react-icons/fa";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth); // Get logged-in user

  // Fetch Enrolled Courses
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/api/student/courses", {
          withCredentials: true,
        });
        console.log(data.courses);
        setCourses(data.courses || []); // Ensure courses is an array
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        toast.error("Failed to load your courses.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyCourses();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold mb-5 text-center">
        My Enrolled Courses
      </h2>

      {loading ? (
        <LoadingAnimation />
      ) : courses.length > 0 ? (
        <div className="flex flex-wrap  gap-2">
          {courses.map((course) => {
            const startDate = new Date(course.start_date);
            const endDate = new Date(course.end_date);
            const durationInWeeks = Math.ceil(
              (endDate - startDate) / (1000 * 60 * 60 * 24 * 7)
            );
            const today = new Date();
            const totalDuration = endDate - startDate;
            const elapsedDuration = today - startDate;
            const progressPercentage = Math.min(
              100,
              Math.max(0, Math.round((elapsedDuration / totalDuration) * 100))
            );

            // Generate a unique gradient color based on course ID
            const gradientId = `gradient-${course._id}`;
            const hue = parseInt(course._id.slice(-6), 16) % 360;

            return (
              <div
                key={course._id}
                className="group w-80 relative overflow-hidden border border-gray-700/50 bg-gray-900/60 p-6 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 hover:border-blue-400/50 hover:-translate-y-1 backdrop-blur-sm"
              >
                {/* Course header */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-800/80 rounded-lg group-hover:bg-blue-900/50 transition-all duration-300 shadow-md">
                      <FaBook className="text-blue-400 text-xl group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mx-2 group-hover:text-blue-400 transition-colors">
                        {course.course_name}
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <FaChalkboardTeacher className="text-blue-500" />
                        <span>
                          Prof. {course.teacher_id.name.split(" ")[0]}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-800/80 text-blue-400 text-xs px-2 py-1 rounded-md backdrop-blur-sm shadow-md">
                    ID: {course._id.slice(-6).toUpperCase()}
                  </div>
                </div>

                {/* Course details grid */}
                <div className="relative z-10 grid grid-cols-2 gap-4 mb-5">
                  {[
                    {
                      icon: <FaCalendarAlt className="text-blue-400" />,
                      label: "Starts",
                      value: startDate.toLocaleDateString(),
                      color: "blue",
                    },
                    {
                      icon: <FaCalendarCheck className="text-purple-400" />,
                      label: "Ends",
                      value: endDate.toLocaleDateString(),
                      color: "purple",
                    },
                    {
                      icon: <FaClock className="text-amber-400" />,
                      label: "Duration",
                      value: `${durationInWeeks} weeks`,
                      color: "amber",
                    },
                    {
                      icon: <FaUsers className="text-emerald-400" />,
                      label: "Students",
                      value: course.students?.length || 0,
                      color: "emerald",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`p-2 bg-gray-800/80 rounded-full shadow-md group-hover:bg-${
                          item.color - 900 / 30
                        } transition-all `}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm font-medium text-white">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress section */}
                <div className="relative z-10 space-y-3 mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <FaPercent className="text-blue-400" />
                      Course Progress
                    </span>
                    <span className="font-medium text-white">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/80 rounded-full h-2.5 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full shadow-[0_0_8px_1px_rgba(59,130,246,0.3)] transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{startDate.toLocaleDateString()}</span>
                    <span>{endDate.toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-1 bg-blue-500/20 blur-lg group-hover:blur-xl transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-[40%] mx-auto text-center">
          <Lottie animationData={notfound_animation} />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-3">
            You are not enrolled in any courses.
          </h2>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
