import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaCogs,
  FaClipboardCheck,
  FaBuilding,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  /* ================= COMMON LINK STYLE ================= */
  const linkClass = ({ isActive }) =>
    `
      group relative flex items-center gap-4
      py-2.5 px-4 rounded-md
      transition-all duration-200
      ${isActive ? "bg-teal-600 text-white" : "text-gray-200 hover:bg-gray-700"}
    `;

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 w-64 shadow-xl">
      {/* ================= LOGO ================= */}
      <div
        className="h-16 flex items-center justify-center
                  bg-teal-600 shadow-md"
      >
        <h3 className="text-xl font-bold tracking-wide">Employee MS</h3>
      </div>

      {/* ================= MENU ================= */}
      <div className="px-4 mt-5 space-y-1">
        <NavLink to="/employee-dashboard" end className={linkClass}>
          {({ isActive }) => (
            <>
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
              )}
              <FaTachometerAlt className="text-lg group-hover:scale-110 transition" />
              <span className="group-hover:translate-x-1 transition">
                Dashboard
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={linkClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
              )}
              <FaUsers className="text-lg group-hover:scale-110 transition" />
              <span className="group-hover:translate-x-1 transition">
                My Profile
              </span>
            </>
          )}
        </NavLink>

        <NavLink to="/employee-dashboard/my-attendance" className={linkClass}>
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
              )}
              <FaClipboardCheck className="text-lg group-hover:scale-110 transition" />
              <span className="group-hover:translate-x-1 transition">
                My Attendance
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/employee-dashboard/attendance-report"
          className={linkClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
              )}
              <FaChartBar className="text-lg group-hover:scale-110 transition" />
              <span className="group-hover:translate-x-1 transition">
                Attendance Report
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={linkClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
              )}
              <FaBuilding className="text-lg group-hover:scale-110 transition" />
              <span className="group-hover:translate-x-1 transition">
                Leaves
              </span>
            </>
          )}
        </NavLink>

        <NavLink to="/employee-dashboard/salary" className={linkClass}>
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
              )}
              <FaCalendarAlt className="text-lg group-hover:scale-110 transition" />
              <span className="group-hover:translate-x-1 transition">
                Salary
              </span>
            </>
          )}
        </NavLink>

        <NavLink to="/employee-dashboard/setting" className={linkClass}>
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
              )}
              <FaCogs className="text-lg group-hover:scale-110 transition" />
              <span className="group-hover:translate-x-1 transition">
                Settings
              </span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
