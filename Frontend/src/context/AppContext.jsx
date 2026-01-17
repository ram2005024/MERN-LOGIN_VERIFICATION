import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContextProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_SERVER;
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [otpRequested, setOtpRequested] = useState(false);
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const response = await axios.post(
        backendURL + "/user/getUserData",
        {},
        {
          withCredentials: true,
        },
      );
      if (response.data?.user) {
        setUserData(response.data?.user);
        if (response.data?.user.isVerified) {
          setIsVerified(true);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAuthentication = async () => {
    try {
      const data = await axios.get(backendURL + "/auth/isAuth", {
        withCredentials: true,
      });
      if (data.data?.success) {
        setIsAuthenticated(true);
        getUserData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAuthentication();
  }, []);
  const logout = async () => {
    try {
      const response = await axios.get(backendURL + "/auth/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAuthenticated(false);
        setUserData({});
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const values = {
    backendURL,
    isVerified,
    setIsVerified,
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData,
    getUserData,
    logout,
    otpRequested,
    setOtpRequested,
    getAuthentication,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
