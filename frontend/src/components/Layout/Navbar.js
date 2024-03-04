import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="text-white text-lg font-bold mr-4">
              FlowWebForge
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className={`${
                  location.pathname === "/dashboard"
                    ? "text-blue-200"
                    : "text-white"
                } mr-4`}
              >
                Dashboard
              </Link>
              <Link
                to="/history"
                className={`${
                  location.pathname === "/history"
                    ? "text-blue-200"
                    : "text-white"
                } mr-4`}
              >
                History
              </Link>
              <Link
                to="/setting"
                className={`${
                  location.pathname === "/setting"
                    ? "text-blue-200"
                    : "text-white"
                } mr-4`}
              >
                Setting
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            {!localStorage.getItem("token") ? (
              <div className="flex">
                <Link to="/login" className="mr-2">
                  <button className="bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative ml-3">
                <button className="bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none">
                  User
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Update Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
