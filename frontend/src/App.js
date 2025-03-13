import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
