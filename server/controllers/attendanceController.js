import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["department", "userId"],
    });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const attendanceReport = async (req, res) => {
  try {
    const { date, limit, skip } = req.query;
    const query = {};

    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: ["department", "userId"],
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }

      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dep_name,
        status: record.status || "Not Marked",
      });

      return result;
    }, {});

    return res.status(201).json({ success: true, groupData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];

    const attendance = await Attendance.find({
      employeeId: employee._id,
      date: { $gte: startStr, $lte: endStr },
    }).sort({ date: -1 });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAttendance, updateAttendance, attendanceReport, getMyAttendance };
