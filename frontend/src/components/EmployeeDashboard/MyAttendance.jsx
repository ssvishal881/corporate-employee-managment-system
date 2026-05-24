import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MyAttendance = () => {
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://corporate-employee-managment-system-sandy.vercel.app/api/attendance/my-attendance?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.data.success) {
        setAttendance(res.data.attendance);
      }
    } catch (err) {
      console.error("Attendance fetch error");
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [month, year]);

  const clearFilter = () => {
    const d = new Date();
    setMonth(d.getMonth() + 1);
    setYear(d.getFullYear());
  };

  const getDayName = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "long" });

  const statusBadge = (status) => {
    if (!status)
      return (
        <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 font-medium">
          Not Marked
        </span>
      );

    const s = status.toLowerCase();

    if (s === "present")
      return (
        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
          Present
        </span>
      );

    if (s === "absent")
      return (
        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 font-medium">
          Absent
        </span>
      );

    if (s === "leave")
      return (
        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 font-medium">
          Leave
        </span>
      );

    return (
      <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 font-medium">
        Not Marked
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* ===== HEADER ===== */}
      <h1 className="text-3xl font-bold mb-1">My Attendance</h1>
      <p className="text-gray-500 mb-6">
        Track your monthly attendance records
      </p>

      {/* ===== FILTER CARD ===== */}
      {/* ===== FILTER CARD ===== */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center gap-6 mb-6">
        <FaCalendarAlt className="text-teal-600 text-xl" />

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded-md px-4 py-2 text-blue-600 font-medium focus:outline-none"
        >
          {months.map((m, i) => (
            <option key={i} value={i + 1}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-md px-4 py-2 text-blue-600 font-medium focus:outline-none"
        >
          {[2023, 2024, 2025, 2026, 2027].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilter}
          className="text-blue-600 font-medium hover:underline"
        >
          Clear Filter
        </button>

        <div className="ml-auto">
          <button
            onClick={() =>
              (window.location.href = "/employee-dashboard/attendance-report")
            }
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Attendance Report
          </button>
        </div>
      </div>

      {/* ===== TABLE CARD ===== */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Date</th>
              <th className="py-4 px-6 text-left font-semibold">Day</th>
              <th className="py-4 px-6 text-left font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : attendance.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  No attendance records found
                </td>
              </tr>
            ) : (
              attendance.map((a) => (
                <tr
                  key={a._id}
                  className="
                    hover:bg-gray-50 
                    transition-all 
                    duration-200 
                    cursor-pointer
                  "
                >
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {a.date}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {getDayName(a.date)}
                  </td>
                  <td className="py-4 px-6">{statusBadge(a.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAttendance;
