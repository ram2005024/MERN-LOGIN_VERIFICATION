import React from "react";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Check */}
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Welcome */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back! 👋
        </h1>

        <p className="text-gray-600 mb-6">Thanks for logging in</p>

        {/* Name */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-4">
          <h2 className="text-2xl font-bold text-indigo-600 mb-1">
            Ram Sharma
          </h2>
          <p className="text-sm text-gray-600">Full Stack Developer</p>
        </div>

        {/* Hire Me */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-4 mb-4">
          <p className="text-lg font-bold text-white">⚡ Please Hire Me! ⚡</p>
        </div>

        {/* Demo Notice */}
        <div className="border-2 border-dashed border-indigo-200 rounded-lg p-4 bg-indigo-50">
          <p className="text-sm font-semibold text-indigo-700">
            📱 This is a Demo Page!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
