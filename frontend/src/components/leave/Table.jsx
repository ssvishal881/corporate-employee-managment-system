import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filterdLeaves, setFilterdLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilterdLeaves(data);
      }
    } catch (error) {
      alert("Failed to fetch leaves!");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const search = e.target.value.toLowerCase();
    const data = leaves.filter((row) =>
      row.employeeId.toLowerCase().includes(search)
    );
    setFilterdLeaves(data);
  };

  const filterdByButton = (status) => {
    const search = status.toLowerCase();
    const data = leaves.filter((row) =>
      row.status.toLowerCase().includes(search)
    );
    setFilterdLeaves(data);
  };

  return (
    <>
      {filterdLeaves ? (
        <div className="min-h-screen bg-gray-100 p-8">
          {/* ===== PAGE CARD ===== */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-3xl font-bold text-gray-800">
                Manage Leaves
              </h3>
              <p className="text-gray-500 mt-1 md:mt-0">
                View and manage employee leave requests
              </p>
            </div>

            {/* FILTER BAR */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              {/* SEARCH */}
              <div className="relative w-full md:w-72">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Employee ID"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={filterByInput}
                />
              </div>

              {/* FILTER BUTTONS */}
              <div className="flex gap-3">
                <FilterButton
                  label="Pending"
                  color="yellow"
                  onClick={() => filterdByButton("Pending")}
                />
                <FilterButton
                  label="Approved"
                  color="green"
                  onClick={() => filterdByButton("Approved")}
                />
                <FilterButton
                  label="Rejected"
                  color="red"
                  onClick={() => filterdByButton("Rejected")}
                />
              </div>
            </div>

            {/* TABLE */}
            <DataTable
              columns={columns}
              data={filterdLeaves}
              pagination
              highlightOnHover
              striped
              responsive
              customStyles={tableStyles}
            />
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-lg font-semibold">
          Loading...
        </div>
      )}
    </>
  );
};

/* ===== FILTER BUTTON COMPONENT ===== */
const FilterButton = ({ label, color, onClick }) => {
  const colors = {
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white font-semibold rounded-lg shadow transition transform hover:scale-105 ${colors[color]}`}
    >
      {label}
    </button>
  );
};

/* ===== DATATABLE STYLES ===== */
const tableStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "700",
      backgroundColor: "#0d9488",
      color: "white",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "52px",
    },
  },
};

export default Table;
