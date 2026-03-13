import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useParams } from "react-router-dom";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { user } = useAuth();
  const { id } = useParams(); // employeeId when admin clicks salary
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      // 🔑 Decide ID & role
      const targetId = id ? id : user._id;
      const role = id ? "admin" : user.role;

      const response = await axios.get(
        `http://localhost:5000/api/salary/${targetId}/${role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setSalaries(response.data.salary || []);
      setFilteredSalaries(response.data.salary || []);
    } catch (error) {
      alert("Unable to load salary");
    }
  };

  useEffect(() => {
    if (user) fetchSalaries();
  }, [user, id]);

  const filterSalaries = (q) => {
    const data = salaries.filter((s) =>
      (s.employeeId?.employeeId || "").toLowerCase().includes(q.toLowerCase()),
    );
    setFilteredSalaries(data);
  };

  if (!filteredSalaries) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Salary History</h2>

      <div className="flex justify-end mb-3">
        <input
          type="text"
          placeholder="Search by Emp ID"
          className="border px-3 py-1 rounded-md"
          onChange={(e) => filterSalaries(e.target.value)}
        />
      </div>

      {filteredSalaries.length ? (
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-4 py-2">S No</th>
              <th className="px-4 py-2">Emp ID</th>
              <th className="px-4 py-2">Basic</th>
              <th className="px-4 py-2">Allowance</th>
              <th className="px-4 py-2">Deduction</th>
              <th className="px-4 py-2">Net</th>
              <th className="px-4 py-2">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{sno++}</td>
                <td className="px-4 py-2">{s.employeeId?.employeeId}</td>
                <td className="px-4 py-2">{s.basicSalary}</td>
                <td className="px-4 py-2">{s.allowances}</td>
                <td className="px-4 py-2">{s.deductions}</td>
                <td className="px-4 py-2 font-semibold">{s.netSalary}</td>
                <td className="px-4 py-2">
                  {new Date(s.payDate).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-6">No salary records found</p>
      )}
    </div>
  );
};

export default View;
