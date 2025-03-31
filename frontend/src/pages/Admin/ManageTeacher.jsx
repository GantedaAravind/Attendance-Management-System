import { useEffect, useState } from "react";
import API from "../../config/axiosInstance.js"; // Import Axios instance
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";
import TeacherCard from "../../components/Admin/TeacherCard.jsx";
import toast from "react-hot-toast";

const ManageTeacher = () => {
  const [teachers, setTeachers] = useState([]); // Store teacher data
  const [loading, setLoading] = useState(false); // Manage loading state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: undefined, // New field for image URL
  });

  useEffect(() => {
    setLoading(true);
    const fetchTeachers = async () => {
      try {
        const { data } = await API.get("/api/teachers"); // Fetch teachers
        setTeachers(data);
      } catch (error) {
        toast.error(
          "Failed to fetch teachers: " + (error.response?.data || error.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleCreateTeacher = async () => {
    try {
      setLoading(true);
      const { data } = await API.post("/api/admin/add-teacher", formData); // API Call
      setTeachers([...teachers, data.teacher]); // Update UI with new teacher
      setFormData({ name: "", email: "", password: "", imageUrl: undefined }); // Reset form
      document.getElementById("my_modal").close(); // Close modal
      toast.success(data.message);
    } catch (error) {
      toast.error(
        "Error adding teacher: " + (error.response?.data || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle teacher deletion
  const handleDeleteTeacher = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/api/admin/delete-teacher/${id}`); // API call to delete teacher
      setTeachers((prevTeachers) => prevTeachers.filter((t) => t._id !== id)); // Remove from UI
      toast.success("Teacher deleted successfully");
    } catch (error) {
      toast.error(
        "Error deleting teacher: " + (error.response?.data || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-10">
      <div className="flex justify-between mb-4 py-5 px-10">
        <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
          Manage Teachers ({teachers.length}) {/* Show total teacher count */}
        </h2>
        <button
          className="btn text-sm sm:text-md md:text-lg lg:text-xl btn-secondary btn-outline"
          onClick={() => document.getElementById("my_modal").showModal()}
        >
          Add Teacher
        </button>

        {/* Modal for adding teacher */}
        <dialog id="my_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-secondary btn-outline absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add New Teacher</h3>
            <div className="p-10">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Teacher Name</legend>
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
                <legend className="fieldset-legend">Teacher's Email</legend>
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
                onClick={handleCreateTeacher}
                disabled={loading}
              >
                Create Teacher
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
      ) : teachers.length > 0 ? (
        <div className="flex flex-wrap pl-5 justify-center sm:justify-start">
          {teachers.map((teacher) => (
            <TeacherCard
              {...teacher}
              key={teacher._id}
              onDelete={handleDeleteTeacher}
            />
          ))}
        </div>
      ) : (
        <div className="w-[40%] mx-auto">
          <Lottie animationData={notfound_animation} />
          <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl pl-5">
            No Teachers Found
            <span className="ml-2 loading loading-dots loading-lg"></span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default ManageTeacher;
