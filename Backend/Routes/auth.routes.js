import express from "express";
import { userAuth } from "../Middlewares/auth.js";
import {
  isAuthenticated,
  loginhandler,
  logout,
  registerHandler,
  resetVerification,
  resetVerificationEntering,
  verificationAPI,
  verifyEmail,
} from "../controllers/auth.controller.js";
export const router = express.Router();
router.post("/register", registerHandler);
router.post("/login", loginhandler);
router.get("/logout", logout);
router.get("/verifyOTP", userAuth, verifyEmail);
router.post("/verifyOTPEntering", userAuth, verificationAPI);
router.post("/resetOTP", resetVerification);
router.post("/resetOTPEntering", resetVerificationEntering);
router.get("/isAuth", userAuth, isAuthenticated);
