import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://corporate-employee-managment-system-sandy.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Employee Details
          </h2>

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* LEFT : IMAGE */}
            <div className="flex justify-center md:w-1/2">
              <img
                src={`https://corporate-employee-managment-system-sandy.vercel.app/${employee.userId.profileImage}`}
                alt="Employee"
                className="w-72 h-72 object-cover object-top rounded-full border-4 border-teal-500 shadow-lg"
              />
            </div>

            {/* RIGHT : DETAILS */}
            <div className="md:w-1/2 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Name</span>
                <span className="font-medium">{employee.userId.name}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Employee ID</span>
                <span className="font-medium">{employee.employeeId}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">
                  Date of Birth
                </span>
                <span className="font-medium">
                  {new Date(employee.dob).toLocaleDateString("en-GB")}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Gender</span>
                <span className="font-medium">{employee.gender}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Department</span>
                <span className="font-medium">
                  {employee.department.dep_name}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">
                  Marital Status
                </span>
                <span className="font-medium">{employee.maritalStatus}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">Loading....</div>
      )}
    </>
  );
};

export default View;
