import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterdAttendance, setFilterdAttendance] = useState([]);

  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://corporate-employee-managment-system-sandy.vercel.app/api/attendance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        const data = response.data.attendance.map((att, index) => ({
          employeeId: att.employeeId.employeeId,
          sno: index + 1,
          department: att.employeeId.department
            ? att.employeeId.department.dep_name
            : "",
          name: att.employeeId.userId ? att.employeeId.userId.name : "",
          action: (
            <AttendanceHelper
              status={att.status}
              employeeId={att.employeeId.employeeId}
              statusChange={statusChange}
            />
          ),
        }));

        setAttendance(data);
        setFilterdAttendance(data);
      }
    } catch (error) {
      alert("Failed to fetch attendance!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const keyword = e.target.value || "";
    const records = attendance.filter((emp) =>
      emp.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilterdAttendance(records);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800 tracking-wide">
          Manage Attendance
        </h3>
        <p className="text-gray-500 mt-1">Mark daily attendance of employees</p>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
        <input
          type="text"
          placeholder="🔍 Search by Employee Name"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none w-full md:w-1/3"
          onChange={handleFilter}
        />

        <p className="text-xl font-semibold text-gray-700">
          Date:&nbsp;
          <span className="font-bold underline decoration-teal-500">
            {new Date().toISOString().split("T")[0]}
          </span>
        </p>

        <Link
          to="/admin-dashboard/attendance-report"
          className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md 
                     hover:bg-teal-700 hover:shadow-lg transition-all duration-200"
        >
          Attendance Report
        </Link>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-4">
        <DataTable
          columns={columns}
          data={filterdAttendance}
          pagination
          progressPending={loading}
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Attendance;
