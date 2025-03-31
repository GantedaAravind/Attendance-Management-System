import notfound_animation from "../assets/not_found.json";

import Lottie from "lottie-react";
const NotFound = () => {
  return (
    <div className="w-5/6 md:w-4/6 lg:w-6/12 mx-auto">
      <Lottie animationData={notfound_animation} />
      <p className="text-lg md:text-xl lg:text-2xl font-bold  text-center">
        No Page Found...
      </p>
    </div>
  );
};
export default NotFound;
