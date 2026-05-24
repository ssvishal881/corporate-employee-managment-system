import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaBuilding,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaUserShield,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import DashboardCharts from "./DashboardCharts";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const { user } = useAuth();

  /* 🔹 TEMP Attendance Summary (can connect real API later) */
  const attendanceSummary = {
    present: 18,
    absent: 4,
    leave: 2,
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          "https://corporate-employee-managment-system-sandy.vercel.app/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setSummary(res.data);
      } catch (error) {
        console.error("Admin summary error");
      }
    };
    fetchSummary();
  }, []);

  if (!summary) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-10">
      {/* ================= WELCOME CARD ================= */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center">
          <div className="bg-teal-600 text-white p-5 rounded-full text-3xl shadow-lg">
            <FaUserShield />
          </div>

          <div className="ml-6">
            <p className="text-gray-500 text-lg">Welcome Back</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name || "Admin"}
            </h2>
            <p className="text-sm text-gray-400">Role: Administrator</p>
          </div>
        </div>
      </div>

      {/* ================= MAIN STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaUsers className="text-teal-600 text-3xl mb-2" />
          <p className="text-gray-500">Total Employees</p>
          <h3 className="text-3xl font-bold">{summary.totalEmployees}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaBuilding className="text-yellow-600 text-3xl mb-2" />
          <p className="text-gray-500">Departments</p>
          <h3 className="text-3xl font-bold">{summary.totalDepartments}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaHourglassHalf className="text-blue-600 text-3xl mb-2" />
          <p className="text-gray-500">Today's Total Leave</p>
          <h3 className="text-3xl font-bold">{summary.todayLeaves}</h3>
        </div>
      </div>

      {/* ================= LEAVE STATUS ================= */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Leave Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaCheckCircle className="text-green-600 text-3xl mb-2" />
            <p className="text-gray-500">Approved</p>
            <h3 className="text-3xl font-bold">
              {summary.leaveSummary.approved}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaHourglassHalf className="text-yellow-600 text-3xl mb-2" />
            <p className="text-gray-500">Pending</p>
            <h3 className="text-3xl font-bold">
              {summary.leaveSummary.pending}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaTimesCircle className="text-red-600 text-3xl mb-2" />
            <p className="text-gray-500">Rejected</p>
            <h3 className="text-3xl font-bold">
              {summary.leaveSummary.rejected}
            </h3>
          </div>
        </div>
      </div>

      {/* ================= CHARTS SECTION ================= */}
      <DashboardCharts
        leaveSummary={summary.leaveSummary}
        attendance={attendanceSummary}
      />
    </div>
  );
};

export default AdminSummary;
