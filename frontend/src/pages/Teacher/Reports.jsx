import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../config/axiosInstance.js";
import toast from "react-hot-toast";
import { FaBook, FaUsers } from "react-icons/fa";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get("/api/teacher/my-courses");
      setCourses(response.data.courses);
    } catch (error) {
      toast.error("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Your Courses</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : courses.length === 0 ? (
        <p className="text-center">No courses assigned.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border border-blue-400 shadow-blue-400 p-5 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
              onClick={() => navigate(`/teacher/reports/${course._id}`)}
            >
              <h3 className="text-md md:text-xl sm:text-lg lg:text-2xl font-bold text-blue-600 flex items-center gap-2">
                <FaBook className="text-blue-500" /> {course.course_name}
              </h3>
              <p className="text-sm sm:text-base md:text-md lg:text-lg flex items-center gap-2 mt-4">
                <FaUsers className="text-green-500" /> Enrolled Students:
                <span className="font-medium">{course.students.length}</span>
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Course ID: {course._id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesList;
