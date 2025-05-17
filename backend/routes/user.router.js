import express from "express";
import upload from "../middlewares/multer.js";
import {
  register,
  verifyOTP,
  login,
  logout,
  getUser,
  forgotPassword,
  validateOtp,
  setNewPassword,
  getRoomDetails,
  updateProfile,
  orgName,
  deleteLinkedEmployee

} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register); //done
router.post("/otp-verification", verifyOTP); //done
router.post("/getorgname",orgName); //done
router.post("/login", login); //done
router.get("/logout", isAuthenticated, logout); //done
router.get("/me", isAuthenticated, getUser); //done
router.post("/password/forgot", forgotPassword); //done
router.post("/password/validate-otp", validateOtp);  //done
router.put("/password/set-new", setNewPassword); //done
router.get("/room/details/:managerKey",isAuthenticated, getRoomDetails); //done
router.put("/update-profile", isAuthenticated, upload.single("profilePic"), updateProfile); //Done
router.delete("/delete/:employeeId", isAuthenticated, deleteLinkedEmployee);

export default router;