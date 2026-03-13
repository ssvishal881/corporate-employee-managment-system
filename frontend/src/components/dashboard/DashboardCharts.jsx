import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DashboardCharts = ({ leaveSummary, attendance }) => {
  /* ===== LEAVE PIE CHART ===== */
  const leaveData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [
          leaveSummary.approved,
          leaveSummary.pending,
          leaveSummary.rejected,
        ],
        backgroundColor: ["#16a34a", "#facc15", "#dc2626"],
      },
    ],
  };

  /* ===== ATTENDANCE BAR CHART ===== */
  const attendanceData = {
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        label: "Attendance Count",
        data: [attendance.present, attendance.absent, attendance.leave],
        backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      {/* Leave Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Leave Status Overview
        </h3>
        <Pie data={leaveData} />
      </div>

      {/* Attendance Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Attendance Overview
        </h3>
        <Bar data={attendanceData} />
      </div>
    </div>
  );
};

export default DashboardCharts;
