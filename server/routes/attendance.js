import express from "express";
import {
  attendanceReport,
  getAttendance,
  updateAttendance,
  getMyAttendance,
} from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import defaultAttendance from "../middleware/defaultAttendance.js";

const router = express.Router();

// ADMIN – mark attendance
router.get("/", authMiddleware, defaultAttendance, getAttendance);

// ADMIN – update attendance
router.put("/update/:employeeId", authMiddleware, updateAttendance);

// ADMIN – report
router.get("/report", authMiddleware, attendanceReport);

// EMPLOYEE – view own attendance
router.get(
  "/my-attendance",
  authMiddleware,
  defaultAttendance,
  getMyAttendance
);

export default router;
