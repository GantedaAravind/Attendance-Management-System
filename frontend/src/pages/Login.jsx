import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router"; // ✅ Fixed incorrect import
import login_animation from "../assets/login.json";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import toast from "react-hot-toast";
import API from "../config/axiosInstance.js";
import { useSelector } from "react-redux";

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        navigate("/student/my-courses");
      } else if (user.role === "teacher") {
        navigate("/teacher/courses");
      } else {
        navigate("/dashboard"); // Example: Redirect to admin/teacher dashboard
      }
    }
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // Added role field
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Role Selection
  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Start loading
    console.log(formData);

    try {
      const { data } = await API.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      dispatch(setUser(data.user)); // Set user in Redux state
      toast.success(data.message); // Show success message

      // Redirect based on user role
      if (data.user.role === "student") {
        navigate("/student/my-courses");
      } else if (data.user.role === "teacher") {
        navigate("/teacher/courses");
      } else {
        navigate("/dashboard"); // Example: Redirect to admin/teacher dashboard
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="flex bg-gray-800/50 shadow-2xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 items-center mt-5 justify-center w-[85%] mx-auto overflow-hidden border border-gray-700">
      {/* Left Side - Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gray-200 opacity-40 blur-xl"></div>
        <div className="absolute bottom-10 left-[50%] w-60 h-60 rounded-full bg-purple-100 opacity-30 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-100 opacity-15 blur-xl"></div>
      </div>

      <div className="w-1/2 hidden md:block">
        <div className="relative">
          <Lottie
            animationData={login_animation}
            className="relative z-10 transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col px-8 py-12 lg:px-12  backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
          {/* Email Input */}
          <div className="mb-6">
            <label className="flex items-center gap-3 px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-purple-400 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500"
                placeholder="mail@site.com"
                required
              />
            </label>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="flex items-center gap-3 px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-purple-400 transition-colors duration-300">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
            </label>
            <div className="mt-2 text-xs text-gray-400 px-4">
              Must include: uppercase, lowercase, number (8+ chars)
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              required
              className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-purple-400 text-gray-200 outline-none transition-colors duration-300"
            >
              <option value="" disabled className="text-gray-500">
                Who Are You?
              </option>
              <option value="student" className="bg-gray-800">
                Student
              </option>
              <option value="teacher" className="bg-gray-800">
                Teacher
              </option>
              <option value="admin" className="bg-gray-800">
                Admin
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-red-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-600 hover:to-pink-600 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <span className="flex items-center gap-2">
                Log In <span className="text-xl">→</span>
              </span>
            )}
          </button>
        </form>

        {/* Sign-Up Link */}
        <p className="mt-8 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-400 hover:text-red-300 underline underline-offset-4 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
