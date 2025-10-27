import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData, isAuthenticated } = useContext(AppContext);
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center  mb-10">
      <img src={assets.robo} className="w-20 mb-6" />
      <div className="flex gap-2">
        <h2 className="font-semibold text-3xl">
          Hey {userData.name || "Developer"}
        </h2>
        <img src={assets.hand_wave} className="w-10" />
      </div>
      <h2 className="text-5xl font-bold">Welcome to our app</h2>
      <p className="text-gray-700 font-light max-w-xl">
        Let's dive into the world full of creativity and build your future
        working together with the exprienced developer inside the Cyrus's Tech
        Coop.
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2 mt-7 hover:bg-gray-100 cursor-pointer">
        Get Started
      </button>
    </div>
  );
};

export default Header;
