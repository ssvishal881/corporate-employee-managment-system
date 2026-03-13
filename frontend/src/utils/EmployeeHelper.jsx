import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ================= TABLE COLUMNS ================= */
export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "70px" },
  { name: "Name", selector: (row) => row.name },
  { name: "Image", selector: (row) => row.profileImage },
  { name: "Department", selector: (row) => row.dep_name },
  { name: "DOB", selector: (row) => row.dob },
  { name: "Action", selector: (row) => row.action, width: "300px" },
];

/* ================= ACTION BUTTONS ================= */
export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => navigate(`/admin-dashboard/employee/view/${_id}`)}
        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        View
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Salary
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${_id}`)}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Leave
      </button>
    </div>
  );
};

/* ================= FETCH DEPARTMENTS ================= */
export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.success ? response.data.departments : [];
  } catch (error) {
    console.error("Fetch department error", error);
    return [];
  }
};

/* ================= FETCH EMPLOYEES BY DEPARTMENT ================= */
export const getEmployees = async (departmentId) => {
  try {
    if (!departmentId) return [];

    const res = await axios.get(
      `http://localhost:5000/api/employee/department/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!res.data.success) return [];

    return res.data.employees.map((emp) => ({
      _id: emp._id,
      name: emp.userId?.name || "Unknown",
    }));
  } catch (err) {
    console.error("Failed to fetch employees by department", err);
    return [];
  }
};
