import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        alert("Failed to load leave details");
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (!leave) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      {/* ===== TITLE ===== */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Leave Details
      </h2>

      {/* ===== PROFILE HEADER ===== */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={`http://localhost:5000/${
            leave.employeeId.userId.profileImage || ""
          }`}
          className="w-36 h-36 rounded-full border-4 border-teal-500 object-cover object-top shadow"
          onError={(e) => (e.target.style.display = "none")}
          alt="Employee"
        />

        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {leave.employeeId.userId.name}
        </h3>

        <p className="text-gray-500">
          Employee ID: {leave.employeeId.employeeId}
        </p>
      </div>

      {/* ===== DETAILS GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <InlineItem label="Leave Type" value={leave.leaveType} />
        <InlineItem
          label="Department"
          value={leave.employeeId.department.dep_name}
        />
        <InlineItem
          label="Start Date"
          value={new Date(leave.startDate).toLocaleDateString("en-GB")}
        />
        <InlineItem
          label="End Date"
          value={new Date(leave.endDate).toLocaleDateString("en-GB")}
        />
        <InlineItem label="Reason" value={leave.reason} full />
      </div>

      {/* ===== STATUS & ACTION ===== */}
      <div className="mt-10 flex items-center justify-between">
        {/* STATUS BADGE */}
        <div className="text-lg">
          <span className="font-semibold">Status:</span>{" "}
          {leave.status === "Approved" && (
            <span className="ml-2 px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
              Approved
            </span>
          )}
          {leave.status === "Rejected" && (
            <span className="ml-2 px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
              Rejected
            </span>
          )}
          {leave.status === "Pending" && (
            <span className="ml-2 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              Pending
            </span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        {leave.status === "Pending" && (
          <div className="flex gap-4">
            <button
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              onClick={() => changeStatus(leave._id, "Approved")}
            >
              Approve
            </button>
            <button
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              onClick={() => changeStatus(leave._id, "Rejected")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ===== INLINE LABEL : VALUE COMPONENT ===== */
const InlineItem = ({ label, value, full }) => (
  <div className={`${full ? "md:col-span-2" : ""}`}>
    <p className="text-lg">
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-gray-700">{value}</span>
    </p>
  </div>
);

export default Detail;
