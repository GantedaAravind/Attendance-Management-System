import Lottie from "lottie-react";
import loading_animation from "../assets/loading.json";
const LoadingAnimation = () => {
  return (
    <div className="w-[40%] mx-auto">
      <Lottie animationData={loading_animation} />
    </div>
  );
};
export default LoadingAnimation;
