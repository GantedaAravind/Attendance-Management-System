import { useEffect, useState } from "react";
import API from "../../config/axiosInstance.js"; // Import Axios instance
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";
import CourseCard from "../../components/Admin/CourseCard.jsx";
import toast from "react-hot-toast";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]); // Store course data
  const [teachers, setTeachers] = useState([]); // Store teacher options
  const [loading, setLoading] = useState(false); // Manage loading state
  const [formData, setFormData] = useState({
    course_name: "",
    teacher_id: "",
    start_date: "",
    end_date: "",
  }); // Form state

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      try {
        const { data } = await API.get("/api/courses"); // Fetch courses
        console.log(data);
        setCourses(data.courses);
      } catch (error) {
        toast.error(
          "Failed to fetch courses:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchTeachers = async () => {
      try {
        const { data } = await API.get("/api/teachers"); // Fetch teachers
        setTeachers(data);
      } catch (error) {
        toast.error(
          "Failed to fetch teachers:",
          error.response?.data || error.message
        );
      }
    };

    fetchCourses();
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    console.log("Changing:", e.target.name, "Value:", e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleCreateCourse = async () => {
    try {
      setLoading(true);
      const { data } = await API.post("/api/admin/create-course", formData); // API Call
      setCourses([...courses, data.course]); // Update UI with new course
      setFormData({
        course_name: "",
        teacher_id: "",
        start_date: "",
        end_date: "",
      }); // Reset form
      document.getElementById("course_modal").close(); // Close modal
      toast.success(data.message);
    } catch (error) {
      toast.error(
        "Error creating course:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle course deletion
  const handleDeleteCourse = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/api/admin/delete-course/${id}`); // API call to delete course
      setCourses((prevCourses) => prevCourses.filter((c) => c._id !== id)); // Remove from UI
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error(
        "Error deleting course:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-10">
      <div className="flex justify-between mb-4 py-5 px-10">
        <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
          Manage Courses
        </h2>
        <button
          className="btn btn-outline border-green-400/20 hover:border-green-400/40 shadow-lg shadow-green-400/20 hover:shadow-green-400/30 text-green-400 hover:text-white  text-sm sm:text-md md:text-lg lg:text-xl "
          onClick={() => document.getElementById("course_modal").showModal()}
        >
          Add Course
        </button>

        {/* Modal for adding course */}
        <dialog id="course_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-secondary btn-outline absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add New Course</h3>
            <div className="p-10">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Course Name</legend>
                <input
                  type="text"
                  name="course_name"
                  className="input"
                  placeholder="Enter Course Name"
                  value={formData.course_name}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Select Teacher</legend>
                <select
                  name="teacher_id"
                  className="input"
                  value={formData.teacher_id}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Teacher
                  </option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name} ({teacher.email})
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Start Date Input */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Start Date</legend>
                <input
                  type="date"
                  name="start_date"
                  className="input"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </fieldset>

              {/* End Date Input */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">End Date</legend>
                <input
                  type="date"
                  name="end_date"
                  className="input"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </fieldset>
            </div>
            <div className="flex items-end mt-10 justify-end">
              <button
                className="btn btn-outline btn-secondary"
                onClick={handleCreateCourse}
                disabled={loading}
              >
                Create Course
                {loading && (
                  <span className="ml-2 loading loading-dots loading-lg"></span>
                )}
              </button>
            </div>
          </div>
        </dialog>
      </div>

      {loading ? (
        <div className="w-[40%] mx-auto">
          <Lottie animationData={loading_animation} />
        </div>
      ) : courses.length > 0 ? (
        <div className="flex flex-wrap pl-5 justify-center sm:justify-start">
          {courses.map((course) => (
            <CourseCard
              {...course}
              key={course._id}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      ) : (
        <div className="w-[40%] mx-auto">
          <Lottie animationData={notfound_animation} />
          <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl pl-5">
            No Courses Found
            <span className="ml-2 loading loading-dots loading-lg"></span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default ManageCourse;
