import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Attendance from "../models/Attendance.js";

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const totalSalaries = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);

    const employeeAppliedForLeave = await Leave.distinct("employeeId");

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayLeaves = await Leave.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find((i) => i._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((i) => i._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((i) => i._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      todayLeaves,
      leaveSummary,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "dashboard summary error" });
  }
};

const getEmployeeSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const todayAttendance = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    const totalLeaves = await Leave.countDocuments({
      employeeId: employee._id,
    });
    const pendingLeaves = await Leave.countDocuments({
      employeeId: employee._id,
      status: "Pending",
    });
    const approvedLeaves = await Leave.countDocuments({
      employeeId: employee._id,
      status: "Approved",
    });

    res.status(200).json({
      success: true,
      attendanceStatus: todayAttendance?.status || "Not Marked",
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Employee dashboard summary error",
    });
  }
};

export { getSummary, getEmployeeSummary };
