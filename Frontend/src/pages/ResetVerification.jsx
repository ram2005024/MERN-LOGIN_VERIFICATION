import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const ResetVerification = () => {
  const [email, setRegisteredEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOTP] = useState("");
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);

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
  //handle EmailReset
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendURL + "/auth/resetOTP", {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //handleForOtp
  const handleOTPReset = async (e) => {
    e.preventDefault();
    const inputCode = inputRef.current.map((items) => {
      return items?.value;
    });
    setOTP(inputCode.join(""));
    setIsOTPSent(true);
  };
  //handleCreatePassword
  const handleCreatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendURL + "/auth/resetOTPEntering", {
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-[url('/background.jpg')] bg-cover bg-center]">
      <img
        src={assets.logo}
        className="w-20 absolute top-6 left-2 cursor-pointer ml-20"
      />
      <div className="w-full flex justify-center items-center">
        {/* Email reset verification */}
        {!isEmailSent && (
          <form
            className="w-86 bg-slate-900 rounded-lg p-8"
            onSubmit={(e) => handleEmailSubmit(e)}
          >
            <h2 className="font-semibold text-center text-white text-2xl mb-4">
              Reset Password
            </h2>
            <p className="text-indigo-300 text-center font-light mb-6 text-sm">
              Enter your registered email
            </p>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setRegisteredEmail(e.target.value)}
                className="bg-zinc-700   py-2.5 pl-10  rounded-3xl text-[14px]  mb-8 w-full text-white border-none relative group"
                placeholder="Email"
              />
              <EnvelopeIcon className="w-4 text-white absolute top-3 left-4" />
              <button
                type="submit"
                className="border-0 cursor-pointer bg-gradient-to-r from-blue-600  to-blue-900 w-full text-white font-bold py-2 rounded-4xl "
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
        {/* Reset OTP Verification */}
        {isEmailSent && !isOTPSent && (
          <form
            className="w-86 bg-slate-900 rounded-lg p-8"
            onSubmit={(e) => handleOTPReset(e)}
          >
            <h2 className="font-semibold text-center text-white text-2xl mb-4">
              Reset Code
            </h2>
            <p className="text-indigo-300 text-center font-light mb-6 text-sm">
              Enter the reset code we sent
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
              Verify Reset
            </button>
          </form>
        )}
        {/* Is OTP sent?? */}
        {isEmailSent && isOTPSent && (
          <form
            className="w-86 bg-slate-900 rounded-lg p-8"
            onSubmit={(e) => handleCreatePassword(e)}
          >
            <h2 className="font-semibold text-center text-white text-2xl mb-4">
              New password
            </h2>
            <p className="text-indigo-300 text-center font-light mb-6 text-sm">
              Enter new password
            </p>
            <div className="relative">
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-zinc-700   py-2.5 pl-10  rounded-3xl text-[14px]  mb-8 w-full text-white border-none relative group"
                placeholder="New password"
              />
              <LockClosedIcon className="w-4 text-white absolute top-3 left-4" />
              <button
                type="submit"
                className="border-0 cursor-pointer bg-gradient-to-r from-blue-600  to-blue-900 w-full text-white font-bold py-2 rounded-4xl "
              >
                Create password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetVerification;
