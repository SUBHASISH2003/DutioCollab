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
  orgName

} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register); //done
router.post("/otp-verification", verifyOTP); //done
router.post("/getorgname",orgName); //done
router.post("/login", login); //done
router.get("/logout", isAuthenticated, logout); //done
router.get("/me", isAuthenticated, getUser); //done
router.post("/password/forgot", forgotPassword);
router.post("/password/validate-otp", validateOtp);  
router.put("/password/set-new", setNewPassword);
router.get("/room/details/:managerKey",isAuthenticated, getRoomDetails);
router.put("/update-profile", isAuthenticated, upload.single("profilePic"), updateProfile);

export default router;