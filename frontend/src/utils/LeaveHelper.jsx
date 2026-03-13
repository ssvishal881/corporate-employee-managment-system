import { useNavigate } from "react-router-dom";

export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "70px" },
  { name: "Emp ID", selector: (row) => row.employeeId },
  { name: "Name", selector: (row) => row.name },
  { name: "Leave Type", selector: (row) => row.leaveType },
  { name: "Department", selector: (row) => row.department },
  { name: "Days", selector: (row) => row.days, width: "80px" },
  { name: "Status", selector: (row) => row.status },
  { name: "Action", selector: (row) => row.action, width: "120px" },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/admin-dashboard/leaves/${Id}`)}
      className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
    >
      View
    </button>
  );
};
