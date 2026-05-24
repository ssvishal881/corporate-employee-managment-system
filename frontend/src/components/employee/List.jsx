import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const List = () => {
  const [employees, setEmployee] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filterdEmployee, setFilterdEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "https://corporate-employee-managment-system-sandy.vercel.app/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: index + 1,
            dep_name: emp.department?.dep_name || "",
            name: emp.userId?.name || "",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString("en-GB") : "",
            profileImage: (
              <img
                src={`https://corporate-employee-managment-system-sandy.vercel.app/${emp.userId?.profileImage || ""}`}
                alt={emp.userId?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-teal-500 shadow"
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));

          setEmployee(data);
          setFilterdEmployees(data);
        }
      } catch (error) {
        alert("Failed to fetch employees!");
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const keyword = e.target.value || "";
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilterdEmployees(records);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-3xl font-bold text-gray-800">Manage Employees</h3>
          <p className="text-gray-500">
            View, manage and update employee details
          </p>
        </div>

        <Link
          to="/admin-dashboard/add-employee"
          className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
        >
          + Add New Employee
        </Link>
      </div>

      {/* Search */}
      <div className="relative w-72 mb-5">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by employee name..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={handleFilter}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <DataTable
          columns={columns}
          data={filterdEmployee}
          pagination
          progressPending={empLoading}
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default List;
