import axios from "axios";
import React, { useEffect, useState } from "react";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }

      const response = await axios.get(
        `https://corporate-employee-managment-system-sandy.vercel.app/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prev) => ({
            ...prev,
            ...response.data.groupData,
          }));
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadmore = () => {
    setSkip((prev) => prev + limit);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Page Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-center text-3xl font-bold text-teal-700 mb-6">
          Attendance Report
        </h2>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-6">
          <label className="text-lg font-semibold text-gray-700">
            Filter By Date:
          </label>
          <input
            type="date"
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSkip(0);
            }}
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-600">
            Loading...
          </div>
        ) : (
          Object.entries(report).map(([date, records]) => (
            <div
              key={date}
              className="mb-8 bg-gray-50 rounded-lg shadow-md p-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                📅{" "}
                {new Date(date)
                  .toLocaleDateString("en-GB")
                  .split("/")
                  .join("-")}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-teal-600 text-white">
                      <th className="border px-4 py-2">S No</th>
                      <th className="border px-4 py-2">Employee ID</th>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Department</th>
                      <th className="border px-4 py-2">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {records.map((data, index) => (
                      <tr
                        key={data.employeeId}
                        className="text-center hover:bg-gray-100 transition"
                      >
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{data.employeeId}</td>
                        <td className="border px-4 py-2">
                          {data.employeeName}
                        </td>
                        <td className="border px-4 py-2">
                          {data.departmentName}
                        </td>
                        <td
                          className={`border px-4 py-2 font-semibold ${
                            data.status === "present"
                              ? "text-green-600"
                              : data.status === "absent"
                                ? "text-red-600"
                                : "text-yellow-600"
                          }`}
                        >
                          {data.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}

        {/* Load More */}
        <div className="text-center">
          <button
            className="mt-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow hover:bg-teal-700 transition"
            onClick={handleLoadmore}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
