import React, { useEffect, useState } from "react";
import API from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";
import { FaUsers, FaBook } from "react-icons/fa"; // Icons for better UI
import { Link } from "react-router";
import {
  FaBook,
  FaUsers,
  FaCalendarAlt,
  FaCalendarCheck,
  FaClock,
  FaChalkboardTeacher,
  FaPercent,
} from "react-icons/fa";
import LoadingAnimation from "../../components/LoadingAnimation";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth); // Get logged-in teacher

  // Fetch Courses Taught by the Teacher
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/api/teacher/my-courses", {
          withCredentials: true,
        });
        setCourses(data.courses || []); // Ensure courses is an array
        // console.log(data.courses);
      } catch (error) {
        console.error("Error fetching teacher courses:", error);
        toast.error("Failed to load your courses.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "teacher") fetchMyCourses();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold mb-5 text-center">
        Courses You Teach
      </h2>

      {loading ? (
        <LoadingAnimation />
      ) : courses.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
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
            return (
              <Link
                to={`/teacher/courses/${course._id}/date`}
                key={course._id}
                className="group relative overflow-hidden border border-gray-700 bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-400 hover:-translate-y-1"
              >
                {/* Course header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-900 transition-colors">
                      <FaBook className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mx-2 group-hover:text-blue-400 transition-colors">
                        {course.course_name}
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <FaChalkboardTeacher className="text-blue-500" />
                        <span>Teacher ID: {course.teacher_id.slice(-6)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-700 text-blue-400 text-xs px-2 py-1 rounded-md">
                    ID: {course._id.slice(-6).toUpperCase()}
                  </div>
                </div>

                {/* Course details grid */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700 rounded-full">
                      <FaCalendarAlt className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Starts</p>
                      <p className="text-sm font-medium text-white">
                        {startDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700 rounded-full">
                      <FaCalendarCheck className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Ends</p>
                      <p className="text-sm font-medium text-white">
                        {endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700 rounded-full">
                      <FaClock className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Duration</p>
                      <p className="text-sm font-medium text-white">
                        {durationInWeeks} weeks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700 rounded-full">
                      <FaUsers className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Students</p>
                      <p className="text-sm font-medium text-white">
                        {course.students.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <FaPercent className="text-blue-400" />
                      Progress
                    </span>
                    <span className="font-medium text-white">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="w-[40%] mx-auto text-center">
          <Lottie animationData={notfound_animation} />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-3">
            You are not teaching any courses.
          </h2>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
