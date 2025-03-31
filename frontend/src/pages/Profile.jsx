import { useEffect, useState } from "react";
import API from "../config/axiosInstance.js";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await API.get("/api/show-profile"); // Fetch user data with extra details
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : user ? (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
          {/* Profile Picture */}
          <div className="text-center">
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 border border-gray-300"
            />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-blue-600 font-bold capitalize">{user.role}</p>
          </div>

          {/* Role-Specific Details */}
          {user.role === "teacher" && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Assigned Courses:</h4>
              <ul className="list-disc ml-5">
                {user.courses.length > 0 ? (
                  user.courses.map((course) => (
                    <li key={course._id}>{course.name}</li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No assigned courses</p>
                )}
              </ul>
            </div>
          )}

          {user.role === "student" && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Enrolled Courses:</h4>
              <ul className="list-disc ml-5">
                {user.courses.length > 0 ? (
                  user.courses.map((course) => (
                    <li key={course._id}>{course.name}</li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No enrolled courses</p>
                )}
              </ul>
              <p className="mt-2">
                <strong>Overall Attendance:</strong>{" "}
                {user.attendancePercentage !== null
                  ? `${user.attendancePercentage}%`
                  : "N/A"}
              </p>
            </div>
          )}

          {user.role === "admin" && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Admin Controls</h4>
              <p className="text-gray-600">
                You have full access to manage users and courses.
              </p>
            </div>
          )}

          {/* Edit Profile Button */}
          <div className="mt-6 text-center">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      ) : (
        <p className="text-center">No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
