import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaBuilding,
  FaUsers,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const AdminSidebar = () => {
  /* ================= LINK STYLE ================= */
  const linkClass = ({ isActive }) =>
    `
    group relative flex items-center gap-4
    py-3 px-5 rounded-lg
    font-medium tracking-wide
    transition-all duration-200
    ${
      isActive
        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }
  `;

  return (
    <div className="bg-gray-900 text-white h-screen fixed left-0 top-0 w-64 shadow-2xl">
      {/* ================= LOGO ================= */}
      <div
        className="h-16 flex items-center justify-center
                  bg-teal-600 shadow-md"
      >
        <h3 className="text-xl font-bold tracking-wide">Employee MS</h3>
      </div>

      {/* ================= MENU ================= */}
      <div className="px-4 mt-6 space-y-2">
        <NavLink to="/admin-dashboard" end className={linkClass}>
          <FaTachometerAlt className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/admin-dashboard/employee" className={linkClass}>
          <FaUsers className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">Employee</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={linkClass}>
          <FaBuilding className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">
            Department
          </span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={linkClass}>
          <FaCalendarAlt className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">Leave</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" className={linkClass}>
          <FaMoneyBillWave className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">Salary</span>
        </NavLink>

        <NavLink to="/admin-dashboard/attendance" className={linkClass}>
          <FaRegCalendarAlt className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">
            Attendance
          </span>
        </NavLink>

        <NavLink to="/admin-dashboard/attendance-report" className={linkClass}>
          <AiOutlineFileText className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">
            Attendance Report
          </span>
        </NavLink>

        <NavLink to="/admin-dashboard/setting" className={linkClass}>
          <FaCogs className="text-lg group-hover:scale-110 transition" />
          <span className="group-hover:translate-x-1 transition">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
