import axios from "axios";
import React, { useEffect, useState } from "react";
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

const EmployeeAttendanceReport = () => {
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/attendance/my-attendance?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setRecords(res.data.attendance);
      }
    } catch (error) {
      console.error("Employee attendance report error");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [month, year]);

  const getDayName = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "long" });

  const statusStyle = (status) => {
    if (!status) return "bg-gray-100 text-gray-600";

    const s = status.toLowerCase();
    if (s === "present") return "bg-green-100 text-green-700";
    if (s === "absent") return "bg-red-100 text-red-700";
    if (s === "leave") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* TITLE */}
        <h2 className="text-center text-3xl font-bold text-teal-700 mb-6">
          Attendance Report
        </h2>

        {/* FILTER */}
        <div className="flex items-center gap-4 mb-6">
          <FaCalendarAlt className="text-teal-600 text-xl" />

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border px-4 py-2 rounded-md text-blue-600 font-medium"
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
            className="border px-4 py-2 rounded-md text-blue-600 font-medium"
          >
            {[2023, 2024, 2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-600">
            Loading...
          </div>
        ) : records.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No attendance records found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Day</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {records.map((rec) => (
                  <tr
                    key={rec._id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium">{rec.date}</td>
                    <td className="px-6 py-4">{getDayName(rec.date)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(
                          rec.status
                        )}`}
                      >
                        {rec.status || "Not Marked"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendanceReport;
