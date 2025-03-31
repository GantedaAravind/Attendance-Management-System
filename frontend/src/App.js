import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import API from "./config/axiosInstance"; // Axios instance
import { setUser } from "./redux/authSlice.js"; // Redux action to store user

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/api/profile");
        dispatch(setUser(data)); // Store user data in Redux
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error.response?.data || error.message
        );
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
