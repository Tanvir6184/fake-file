import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md  ">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
