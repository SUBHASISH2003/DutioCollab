import express from "express";
import {
  submitLeaveRequest,
  getLeaveRequests,
  updateLeaveRequestStatus,
  getLeaveRequestsByStatus
} from "../controllers/leaveRequest.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Employee: Submit a leave request
router.post("/create", isAuthenticated, submitLeaveRequest);

// Manager & Employee: Get leave requests
router.get("/get", isAuthenticated, getLeaveRequests);

// Manager: Update leave request status (approve/reject)
router.patch("/status/:leaveRequestId", isAuthenticated, updateLeaveRequestStatus);

router.get("/status/:status", isAuthenticated, getLeaveRequestsByStatus);

export const leaveRoutes = router;
