import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
const Login = () => {
  const [state, setState] = useState("SignUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, getUserData } = useContext(AppContext);
  const formHandler = async (e) => {
    e.preventDefault();

    if (state === "SignUp") {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://localhost:5000/auth/register`,
          { name, email, password }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setIsAuthenticated(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(`http://localhost:5000/auth/login`, {
          email,
          password,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          setIsAuthenticated(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-[url('/background.jpg')] bg-cover bg-center]">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-20 absolute top-6 left-2 cursor-pointer ml-20"
      />
      <div className="flex flex-col justify-center  sm:w-100 w-full px-14 py-5 border rounded-4xl border-gray-500 bg-[#1a1b3f]">
        {state === "SignUp" ? (
          <>
            <h2 className="text-center font-semibold text-4xl text-white">
              Register
            </h2>
            <h2 className="text-center font-light text-[15px] text-blue-200">
              Register your form
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-center font-semibold text-4xl text-white">
              Login
            </h2>
            <h2 className="text-center font-light text-[15px] text-blue-200">
              Login your form
            </h2>
          </>
        )}
        <form className="mt-8 mb-3" onSubmit={formHandler}>
          {state === "SignUp" && (
            <div className="flex relative">
              <input
                type="text"
                placeholder="Enter your name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="px-10  py-2 mb-4 relative rounded-4xl w-full text-gray-300 bg-zinc-700 outline-0"
              />
              <UserIcon className="w-5 absolute left-2.5 top-3  text-gray-400 rounded-full" />
            </div>
          )}
          <div className="flex relative">
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-10  py-2 mb-4 relative rounded-4xl w-full text-gray-300 bg-zinc-700 outline-0"
            />
            <EnvelopeIcon className="w-5 absolute left-2.5 top-3  text-gray-400 rounded-full" />
          </div>
          <div className="flex relative">
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-10  py-2 mb-4 relative rounded-4xl w-full text-gray-300 bg-zinc-700 outline-0"
            />
            <LockClosedIcon className="w-5 absolute left-2.5 top-3  text-gray-400 rounded-full" />
          </div>
          {state !== "SignUp" && (
            <p>
              <span
                onClick={() => navigate("/resetVerification")}
                className="text-blue-500 text-[16px] cursor-pointer"
              >
                Forget password?
              </span>
            </p>
          )}
          <button
            type="submit"
            className="border-0 cursor-pointer bg-gradient-to-r from-blue-600  to-blue-900 w-full text-white font-bold py-2 rounded-4xl mt-4"
          >
            {state === "SignUp" ? "Sign Up" : "Login"}
          </button>
        </form>
        {state === "SignUp" ? (
          <p className="text-center text-gray-500 ">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="underline text-1xl cursor-pointer  text-blue-500"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-500 ">
            Don't have an account?{" "}
            <span
              onClick={() => setState("SignUp")}
              className="underline text-1xl cursor-pointer  text-blue-500"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
