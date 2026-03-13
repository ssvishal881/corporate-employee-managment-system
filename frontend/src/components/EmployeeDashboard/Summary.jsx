import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
import StatCard from "../common/StatCard";

const Summary = () => {
  const { user } = useAuth();

  const [summary, setSummary] = useState({
    attendanceStatus: "Not Marked",
    totalLeaves: 0,
    pendingLeaves: 0,
  });

  const [salary, setSalary] = useState(0);

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/employee-summary",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) setSummary(res.data);
    } catch (err) {
      console.error("Summary error");
    }
  };

  const fetchSalary = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/salary/${user._id}/employee`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success && res.data.salary.length > 0) {
        setSalary(res.data.salary.at(-1).netSalary);
      }
    } catch (err) {
      console.error("Salary error");
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchSalary();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* ===== WELCOME CARD ===== */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center">
          <div className="bg-teal-600 text-white p-5 rounded-full text-3xl shadow-lg">
            <FaUser />
          </div>
          <div className="ml-6">
            <p className="text-gray-500 text-lg">Welcome Back</p>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-400">
              Hope you have a productive day 🚀
            </p>
            <p className="text-sm text-gray-400 capitalize">
              Role: {user.role}
            </p>
          </div>
        </div>

        <img
          src={`http://localhost:5000/${user.profileImage}`}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-teal-500 object-cover object-top"
        />
      </div>

      {/* ===== STATS (USING StatCard) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<FaCalendarCheck />}
          label="Today Attendance"
          value={summary.attendanceStatus}
          color="text-green-500"
        />

        <StatCard
          icon={<FaClipboardList />}
          label="Leaves Taken"
          value={summary.totalLeaves}
          color="text-yellow-500"
        />

        <StatCard
          icon={<FaMoneyBillWave />}
          label="Latest Salary"
          value={`₹${salary}`}
          color="text-blue-500"
        />

        <StatCard
          icon={<FaUser />}
          label="Pending Leaves"
          value={summary.pendingLeaves}
          color="text-purple-500"
        />
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/employee-dashboard/add-leave"
            className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
          >
            Apply Leave
          </Link>
          <Link
            to="/employee-dashboard/my-attendance"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Attendance
          </Link>

          <Link
            to="/employee-dashboard/salary"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
          >
            View Salary
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;
