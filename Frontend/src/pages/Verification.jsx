import { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Verification = () => {
  const navigate = useNavigate();
  const {
    backendURL,
    getAuthentication,
    isAuthenticated,
    isVerified,
    otpRequested,
    setOtpRequested,
  } = useContext(AppContext);
  const inputRef = useRef([]);
  //handeling the ipout to move to the next input field
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };
  //handeling keydown event to delete the input field
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  //handeling the paste option
  const handlePaste = (e) => {
    const pasteText = e.clipboardData.getData("text").slice(0, 6);
    const pasteArray = pasteText.split("");
    pasteArray.forEach((items, index) => {
      inputRef.current[index].value = items;
    });
  };
  //handeling the submit after verification submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputCode = inputRef.current.map((items) => {
      return items?.value;
    });
    const code = inputCode.join("");

    try {
      const { data } = await axios.post(
        backendURL + "/auth/verifyOTPEntering",
        {
          code,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        getAuthentication();
        toast.success(data.message);
        setOtpRequested(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!isAuthenticated || isVerified || !otpRequested) {
      navigate("/");
    }
  }, [isAuthenticated, isVerified, navigate, otpRequested]);
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-[url('/background.jpg')] bg-cover bg-center]">
      <img
        src={assets.logo}
        className="w-20 absolute top-6 left-2 cursor-pointer ml-20"
      />
      <div className="w-full flex justify-center items-center">
        <form
          className="w-86 bg-slate-900 rounded-lg p-8"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h2 className="font-semibold text-center text-white text-2xl mb-4">
            Verification Code
          </h2>
          <p className="text-indigo-300 text-center font-light mb-6 text-sm">
            Verify your email we sent
          </p>
          <div
            className="flex gap-2 w-full justify-center text-center mb-8"
            onPaste={(e) => handlePaste(e)}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  key={index}
                  required
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="bg-zinc-700  text-center w-9 h-9 rounded-sm text-xl text-white"
                />
              ))}
          </div>
          <button
            type="submit"
            className="border-0 cursor-pointer bg-gradient-to-r from-blue-600  to-blue-900 w-full text-white font-bold py-2 rounded-4xl "
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
