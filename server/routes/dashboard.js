import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSummary,
  getEmployeeSummary,
} from "../controllers/dashboardController.js";

const router = express.Router();

// ADMIN
router.get("/summary", authMiddleware, getSummary);

// EMPLOYEE
router.get("/employee-summary", authMiddleware, getEmployeeSummary);

export default router;
