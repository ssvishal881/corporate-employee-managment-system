import React from "react";
import { useAuth } from "../../context/authContext";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div
      className="relative h-16 px-8 flex items-center justify-end
      bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500
      shadow-lg"
    >
      {/* Center Welcome Glass Card */}
      <div
        className="absolute left-0
  flex items-center gap-3
  bg-white/20 backdrop-blur-md
  px-6 py-2 rounded-xl shadow-md"
      >
        <FaUserCircle className="text-white text-3xl" />
        <div className="text-white leading-tight">
          <p className="text-xs opacity-90">Welcome back</p>
          <p className="text-lg font-semibold">{user?.name || "Admin"}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-2
        bg-white text-teal-700
        px-4 py-2 rounded-full
        font-semibold shadow-md
        hover:bg-gray-100 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Navbar;
