import { useEffect, useState } from "react";
import API from "../config/axiosInstance.js";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/LoadingAnimation.jsx";

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
    <div className="p-6  min-h-screen">
      <h2 className="text-3xl font-bold  mb-6 text-center">My Profile</h2>

      {loading ? (
        <LoadingAnimation />
      ) : user ? (
        <div className="max-w-lg mx-auto  rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={
                  user.imageUrl ||
                  "https://www.gravatar.com/avatar/default?s=200"
                }
                alt={user.name}
                className="w-full h-full rounded-full border-4 border-white shadow-md"
                onError={(e) => {
                  e.target.src =
                    "https://www.gravatar.com/avatar/default?s=200";
                }}
              />
            </div>
            <h3 className="text-2xl font-bold text-white mt-4">{user.name}</h3>
            <p className="text-blue-100">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-semibold capitalize">
              {user.role}
            </span>
          </div>

          {/* Profile Details */}
          <div className="p-6 bg-blue-950">
            {/* Role-Specific Details */}
            {user.role === "teacher" && (
              <div className="mb-6">
                <h4 className="text-xl font-semibold  mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  Assigned Courses
                </h4>
                {user.courses.length > 0 ? (
                  <div className="space-y-2">
                    {user.courses.map((course) => (
                      <div
                        key={course._id}
                        className="flex items-center p-3  rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">{course.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No assigned courses</p>
                )}
              </div>
            )}

            {user.role === "student" && (
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Enrolled Courses
                </h4>
                {user.courses.length > 0 ? (
                  <div className="space-y-3">
                    {user.courses.map((course) => (
                      <div
                        key={course._id}
                        className="flex  hover:text-blue-500 items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-sm"
                      >
                        <div className="bg-blue-100 p-2 rounded-full mr-3  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="font-medium ">
                          {course.course_name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center border border-gray-200 rounded-lg">
                    <p className="text-gray-500">
                      You haven't enrolled in any courses yet.
                    </p>
                    <button className="mt-2 text-blue-600 font-medium text-sm hover:underline">
                      Browse Courses
                    </button>
                  </div>
                )}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between">
                    <p className="text-blue-800 font-medium">
                      <span className="font-bold">Overall Attendance:</span>{" "}
                      {user.attendancePercentage !== null
                        ? `${user.attendancePercentage}%`
                        : "N/A"}
                    </p>
                    {user.attendancePercentage !== null && (
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center">
                        <span className="text-blue-800 font-bold text-sm">
                          {user.attendancePercentage}%
                        </span>
                      </div>
                    )}
                  </div>
                  {user.attendancePercentage !== null && (
                    <div className="mt-3 w-full bg-blue-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${user.attendancePercentage}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {user.role === "admin" && (
              <div className="mb-6 p-4 rounded-lg">
                <h4 className="text-xl font-semibold  mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Admin Controls
                </h4>
                <p className="text-gray-300">
                  You have full access to manage users, courses, and system
                  settings.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No profile data available
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please try again later or contact support
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
