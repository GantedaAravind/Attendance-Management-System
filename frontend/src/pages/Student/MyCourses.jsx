import React, { useEffect, useState } from "react";
import API from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";
import { FaChalkboardTeacher } from "react-icons/fa";

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
        <div className="w-[40%] mx-auto">
          <Lottie animationData={loading_animation} />
        </div>
      ) : courses.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border p-5 rounded-lg shadow-2xl shadow-green-500 transition-transform transform hover:scale-105 duration-300  "
            >
              {/* Course Title */}
              <h3 className="text-xl font-bold text-red-700 mb-2">
                {course.course_name}
              </h3>

              {/* Instructor Info */}
              <p className="text-gray-700 flex items-center gap-2">
                <FaChalkboardTeacher className="text-lg text-green-500" />
                Instructor:{" "}
                <span className="font-medium text-green-300">
                  {course.teacher_id?.name || "Unknown"}
                </span>
              </p>

              {/* Course ID (Optional for Reference) */}
              <p className="text-gray-500 text-sm mt-5">
                Course ID: {course._id}
              </p>
            </div>
          ))}
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
