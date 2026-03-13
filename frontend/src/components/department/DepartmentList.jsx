import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const data = response.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={fetchDepartments}
            />
          ),
        }));

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      alert("Failed to fetch departments");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const keyword = e.target.value.toLowerCase();
    setFilteredDepartments(
      departments.filter((d) => d.dep_name.toLowerCase().includes(keyword))
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Manage Departments
          </h2>
          <p className="text-gray-500 mt-1">
            View, add, edit and delete departments
          </p>
        </div>

        <Link
          to="/admin-dashboard/add-department"
          className="mt-4 md:mt-0 inline-flex items-center px-5 py-2.5 
          bg-teal-600 text-white font-semibold rounded-lg shadow 
          hover:bg-teal-700 transition"
        >
          + Add Department
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-5">
        <input
          type="text"
          placeholder="Search by department name..."
          onChange={filterDepartments}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredDepartments}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default DepartmentList;
