import { useEffect, useState } from "react";
import API from "../../config/axiosInstance.js"; // Import Axios instance
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";
import StudentCard from "../../components/Admin/StudentCard.jsx";
import toast from "react-hot-toast";

const AddStudent = () => {
  const [students, setStudents] = useState([]); // Store student data
  const [loading, setLoading] = useState(false); // Manage loading state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: undefined, // New field for image URL
  });

  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {
      try {
        const { data } = await API.get("/api/students"); // Fetch students
        setStudents(data);
      } catch (error) {
        toast.error(
          "Failed to fetch students: " + (error.response?.data || error.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleCreateStudent = async () => {
    try {
      setLoading(true);
      const { data } = await API.post("/api/admin/add-student", formData); // API Call
      setStudents([...students, data.student]); // Update UI with new student
      setFormData({ name: "", email: "", password: "", imageUrl: undefined }); // Reset form
      document.getElementById("student_modal").close(); // Close modal
      toast.success(data.message);
    } catch (error) {
      toast.error(
        "Error adding student: " + (error.response?.data || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle student deletion
  const handleDeleteStudent = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/api/admin/delete-student/${id}`); // API call to delete student
      setStudents((prevStudents) => prevStudents.filter((s) => s._id !== id)); // Remove from UI
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error(
        "Error deleting student: " + (error.response?.data || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-10">
      <div className="flex justify-between mb-4 py-5 px-10">
        <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
          Manage Students ({students.length}) {/* Show total students count */}
        </h2>
        <button
          className="btn text-sm sm:text-md md:text-lg lg:text-xl btn-secondary btn-outline"
          onClick={() => document.getElementById("student_modal").showModal()}
        >
          Add Student
        </button>

        {/* Modal for adding student */}
        <dialog id="student_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-secondary btn-outline absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add New Student</h3>
            <div className="p-10">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Student Name</legend>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Student's Email</legend>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              {/* New Image URL Input */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Profile Image URL</legend>
                <input
                  type="text"
                  name="imageUrl"
                  className="input"
                  placeholder="Enter Profile Image URL (optional)"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </fieldset>
            </div>
            <div className="flex items-end mt-10 justify-end">
              <button
                className="btn btn-outline btn-secondary"
                onClick={handleCreateStudent}
                disabled={loading}
              >
                Create Student
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
      ) : students.length > 0 ? (
        <div className="flex flex-wrap pl-5 justify-center sm:justify-start">
          {students.map((student) => (
            <StudentCard
              {...student}
              key={student._id}
              onDelete={handleDeleteStudent}
            />
          ))}
        </div>
      ) : (
        <div className="w-[40%] mx-auto">
          <Lottie animationData={notfound_animation} />
          <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl pl-5">
            No Students Found
            <span className="ml-2 loading loading-dots loading-lg"></span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
