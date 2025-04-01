import { Link } from "react-router";
import Lottie from "lottie-react";

import attendance_animation from "../assets/teacher_student.json";

const Home = () => {
  return (
    <div className="flex flex-col  relative ">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gray-200 opacity-40 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-purple-100 opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-100 opacity-15 blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row flex-grow items-center justify-center z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center">
          {/* Left Side - Enhanced Content */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <div className="inline-block px-4 py-2 bg-red-400 text-white rounded-full text-sm font-medium mb-4 shadow-sm">
              🚀 New & Improved
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-purple-600  py-2 bg-clip-text text-transparent">
              Transform Your <span className="block">Attendance Tracking</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed my-5 max-w-lg">
              Attendance Pro simplifies workforce management with AI-powered
              insights, real-time analytics, and automated reporting—saving you
              hours every week.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/login" className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <button className="relative px-8 py-4 bg-red-500 hover:bg-white text-gray-300 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:text-red-600">
                  Get Started Free →
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <img
                    key={item}
                    src={`https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "women" : "men"
                    }/${item}0.jpg`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt="User"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Trusted by{" "}
                <span className="font-medium text-gray-700">500+</span>{" "}
                organizations
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Animation */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative">
            <div className="relative max-w-lg mx-auto">
              <div className="absolute top-10 -left-6 w-24 h-24 bg-red-100 rounded-full opacity-40 blur-lg"></div>
              <div className="relative z-10  p-2 rounded-2xl shadow-xl  ">
                <Lottie
                  animationData={attendance_animation}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex items-center justify-end ">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm font-medium ">Live Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
