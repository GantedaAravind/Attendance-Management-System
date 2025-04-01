import React, { useEffect, useState } from "react";
import API from "../../config/axiosInstance"; // Axios instance
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";
import LoadingAnimation from "../../components/LoadingAnimation";

const EnrollCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth); // Get logged-in user
  const [enrolling, setEnrolling] = useState(""); // Track enrolling course

  // Fetch All Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/api/courses");
        setCourses(data.courses || []); // Ensure an array is always set
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle Course Enrollment
  const handleEnroll = async (courseId) => {
    if (!user) {
      toast.error("You must be logged in to enroll.");
      return;
    }

    try {
      setEnrolling(courseId); // Set loading state for the specific button
      const { data } = await API.post(
        `/api/student/enroll/${courseId}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message || "Enrolled successfully!");

      // Update the enrolled courses list dynamically
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? { ...course, students: [...course.students, user._id] }
            : course
        )
      );
    } catch (error) {
      console.error(
        "Enrollment failed:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Enrollment failed.");
    } finally {
      setEnrolling(""); // Reset loading state
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Enroll in a Course
      </h2>

      {loading ? (
        <LoadingAnimation />
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const isEnrolled = course.students.some(
              (student) => student === user._id
            );
            const rating = course.rating || 4.5; // Default rating if not available

            return (
              <div
                key={course._id}
                className="relative bg-green-400 shadow-2xl shadow-green-400 overflow-hidden border border-gray-200 p-6 rounded-2xl  hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group "
              >
                <div className="space-y-3">
                  {/* Course title with hover effect */}
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.course_name}
                  </h3>

                  {/* Instructor with avatar */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {course.teacher_id?.name?.charAt(0) || "U"}
                    </div>
                    <p className="text-sm text-gray-600">
                      {course.teacher_id?.name || "Unknown Instructor"}
                    </p>
                  </div>

                  {/* Rating stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({rating.toFixed(1)})
                    </span>
                  </div>

                  {/* Students count with icon */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>
                      {course.students.length}{" "}
                      {course.students.length === 1 ? "student" : "students"}{" "}
                      enrolled
                    </span>
                  </div>

                  {/* Enrollment button */}
                  <div className="pt-2">
                    {isEnrolled ? (
                      <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-green-50 text-green-700 font-medium">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span>Enrolled</span>
                      </div>
                    ) : (
                      <button
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          enrolling === course._id
                            ? "bg-blue-400 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg"
                        }`}
                        onClick={() => handleEnroll(course._id)}
                        disabled={enrolling === course._id}
                      >
                        {enrolling === course._id ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>Enrolling...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              ></path>
                            </svg>
                            <span>Enroll Now</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-[40%] mx-auto text-center">
          <Lottie animationData={notfound_animation} />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-3">
            No Courses Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default EnrollCourse;
