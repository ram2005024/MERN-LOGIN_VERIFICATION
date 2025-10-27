import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Navigation = () => {
  const { userData, isAuthenticated, logout, backendURL, setOtpRequested } =
    useContext(AppContext);
  const navigate = useNavigate();
  const handleVerify = async () => {
    try {
      const { data } = await axios.get(backendURL + "/auth/verifyOTP", {
        withCredentials: true,
      });
      if (data.success) {
        setOtpRequested(true);
        navigate("/emailVerification");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-between items-center px-12 py-2 sm:px-24 sm:p-4 absolute top-0">
      <img src={assets.logo} className="w-20" />
      {isAuthenticated ? (
        <div className="relative group inline-block">
          <div className="text-lg font-semibold text-white bg-black w-8 rounded-4xl text-center">
            {userData.name?.[0]}
          </div>
          <div className="px-2 py-2 absolute hidden top-0 right-0 w-30 bg-yellow-50 rounded-lg group-hover:block z-10 transition-all">
            <ul>
              {!userData.isVerified && (
                <li
                  onClick={handleVerify}
                  className="hover:bg-gray-200 cursor-pointer transition-all"
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="hover:bg-gray-200 transition-all cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 border border-gray-500 rounded-full bg-gray-200 px-6 py-2 cursor-pointer hover:bg-gray-300"
        >
          Login
          <img src={assets.right_arrow} className="w-5" />
        </Link>
      )}
    </div>
  );
};

export default Navigation;
