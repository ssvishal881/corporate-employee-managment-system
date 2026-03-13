import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves || []);
      }
    } catch (error) {
      alert("Failed to load leaves");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manage Leaves</h2>
          <p className="text-gray-500 mt-1">
            View and manage your leave requests
          </p>
        </div>

        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="mt-4 md:mt-0 inline-flex items-center px-5 py-2.5 
            bg-teal-600 text-white font-semibold rounded-lg shadow 
            hover:bg-teal-700 transition"
          >
            + Add New Leave
          </Link>
        )}
      </div>

      {/* Search box (UI purpose only for now) */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Search leave by type..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg 
          focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">S No</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{sno++}</td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {leave.leaveType}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(leave.startDate).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(leave.endDate).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{leave.reason}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-6 text-center text-gray-500" colSpan="6">
                  No leave records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
