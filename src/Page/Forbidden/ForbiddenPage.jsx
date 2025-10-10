import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <div className="text-center">
        <FaLock className="text-red-500 text-7xl mx-auto mb-4 animate-bounce" />
        <h1 className="text-6xl font-extrabold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold mt-2">Access Forbidden</h2>
        <p className="text-gray-500 mt-2 mb-6">
          Sorry, you don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
