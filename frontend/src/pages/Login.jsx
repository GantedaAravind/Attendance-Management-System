import React, { useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router"; // ✅ Fixed incorrect import
import login_animation from "../assets/login.json";

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Start loading
    console.log(formData);

    try {
      const response = await fetch(
        "https://attendancemanagementsystemapi.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send form data including role
        }
      );

      const data = await response.json(); // Parse the response

      if (response.ok) {
        console.log("Login successful:", data);
        // Handle successful login (e.g., store token, redirect user)
      } else {
        console.error("Login failed:", data);
        // Handle login failure
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="flex shadow-2xl items-center mt-16 justify-center w-[75%] mx-auto">
      {/* Left Side - Animation */}
      <div className="w-1/2 hidden md:block">
        <Lottie animationData={login_animation} />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col px-10 lg:px-16">
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
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
              className="text-base md:text-md lg:text-lg w-full"
              placeholder="mail@site.com"
              required
            />
          </label>
          {/* Password Input */}
          <label className="input validator mt-4">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
          {/* Role Selection */}
          <select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            required
            defaultValue="Who are You?"
            className="select mt-4"
          >
            <option value="" disabled>
              Who Are You?
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          {/* Submit Button */}
          <div className="flex justify-center border-base-100 border-2">
            <button
              type="submit"
              className="text-base md:text-md lg:text-lg btn btn-outline btn-secondary w-fit mt-5 px-5"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-dots loading-md p-1"></span>
              )}
              Log In
            </button>
          </div>
        </form>

        {/* Sign-Up Link */}
        <p className="mt-5 text-base md:text-md lg:text-lg">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
