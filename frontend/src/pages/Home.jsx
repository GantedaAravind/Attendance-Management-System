import { Link } from "react-router";
import Lottie from "lottie-react";

import attendance_animation from "../assets/teacher_student.json";

const Home = () => {
  return (
    <div className="flex flex-col   h-[85vh]">
      {/* Main Content (Takes Full Height Below Navbar) */}
      <div className="flex flex-grow items-center justify-center">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
          {/* Left Side - Description & Login Button */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold hover:text-red-500">
              Welcome to Attendance Pro
            </h1>
            <p className="mt-4 text-gray-600 text-lg hover:text-white">
              Effortlessly track and manage attendance with our smart solution.
            </p>
            <Link to="/login">
              <button className="btn btn-soft btn-secondary my-4">
                Get Started
              </button>
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <Lottie animationData={attendance_animation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
