import React, { useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import SignUp_animation from "../assets/rigister.json";
import toast from "react-hot-toast";
import API from "../config/axiosInstance";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    imageUrl: undefined, // New field for image URL
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const { data } = await API.post("/api/auth/register", formData);
      console.log("Registration successful:", data);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      toast.error(
        "Registration failed: " +
          (error.response?.data?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex shadow-2xl  rounded-2xl bg-gray-800 items-center mt-16 justify-center w-[75%] mx-auto">
      <div className="w-1/2 hidden md:block">
        <Lottie animationData={SignUp_animation} />
      </div>
      <div className="w-full md:w-1/2 flex flex-col px-10 lg:px-16">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input validator">
              <input
                type="text"
                name="name"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
                value={formData.name} // Fixed issue (was formData.username)
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="mt-4">
            <label className="input validator">
              <input
                type="email"
                name="email"
                placeholder="mail@site.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="mt-4">
            <label className="input validator">
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* New Image URL Input */}
          <div className="mt-4">
            <label className="input validator">
              <input
                type="text"
                name="imageUrl"
                placeholder="Profile Image URL (optional)"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="mt-4">
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="select"
            >
              <option value="" disabled>
                Who Are You?
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="flex justify-center mt-8 pr-6">
            <button
              type="submit"
              className="text-base md:text-md lg:text-lg btn btn-outline btn-secondary w-fit px-5"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-dots loading-md p-1"></span>
              )}
              SignUp
            </button>
          </div>
        </form>

        <p className="mt-5 text-base md:text-md lg:text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
