import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `https://corporate-employee-managment-system-sandy.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        alert("Failed to fetch department");
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://corporate-employee-managment-system-sandy.vercel.app/api/department/${id}`,
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
      alert("Failed to update department");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Edit Department
        </h2>
        <p className="text-gray-500 mb-6">Update department information</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg 
            font-semibold hover:bg-blue-700 transition shadow"
          >
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
