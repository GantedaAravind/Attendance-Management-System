import React, { useEffect, useState } from "react";
import API from "../../config/axiosInstance"; // Axios instance
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";

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
        <div className="w-[40%] mx-auto">
          <Lottie animationData={loading_animation} />
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const isEnrolled = course.students.some(
              (student) => student === user._id
            );

            return (
              <div key={course._id} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{course.course_name}</h3>
                <p className="text-sm text-gray-500">
                  Instructor: {course.teacher_id?.name || "Unknown"}
                </p>
                {isEnrolled ? (
                  <span className="text-green-600 font-semibold block mt-2">
                    ✅ Already Enrolled
                  </span>
                ) : (
                  <button
                    className="mt-3 btn btn-primary btn-sm w-full"
                    onClick={() => handleEnroll(course._id)}
                    disabled={enrolling === course._id}
                  >
                    {enrolling === course._id ? "Enrolling..." : "Enroll"}
                  </button>
                )}
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
