import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://corporate-employee-managment-system-sandy.vercel.app/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      alert("Failed to add department");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Add New Department
        </h2>
        <p className="text-gray-500 mb-6">
          Create a new department for your organization
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              placeholder="e.g. IT, HR, Finance"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              rows="4"
              placeholder="Brief description about department"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg 
            font-semibold hover:bg-teal-700 transition shadow"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
