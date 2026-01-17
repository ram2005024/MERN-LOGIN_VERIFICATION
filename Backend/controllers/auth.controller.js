import UserModel from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import { resend } from "../config/resend.js";
import {
  resetTemplate,
  verificationTemplate,
  welcomeTemplate,
} from "../Templates/authTemplate.js";
import jwt from "jsonwebtoken";
//Register controller
export const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ success: false, message: "All fields are required" });
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });

    const getSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, getSalt);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    try {
      const data = await resend.emails.send({
        from: "Cyrus <onboarding@resend.dev>", // must be verified domain or default resend.dev
        to: email,
        subject: "Welcome to the creative tech field Cyrus",
        html: String(welcomeTemplate.replace("{name}", name)),
      });
      console.log("Email sent:", data);
    } catch (error) {
      console.error("Email error:", error);
    }

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Registration failed" });
  }
};
//Login controller
export const loginhandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: "All fields are required" });
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser)
    return res.json({ success: false, message: "User doesnot exist" });

  try {
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched)
      return res.json({ success: false, message: "Incorrect password" });
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "User loggedin successfully" });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Login failed " });
  }
};
//logout controller
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    res.json({ success: false, message: "Logout error" });
  }
};
//verification code
export const verifyEmail = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    user.verifyOTP = Math.floor(100000 + Math.random() * 900000);
    user.verifyOTPExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    try {
      const data = await resend.emails.send({
        from: "Cyrus <onboarding@resend.dev>", // must be verified domain or default resend.dev
        to: user.email,
        subject: "Verification Code",
        html: String(
          verificationTemplate.replace("{verificationCode}", user.verifyOTP),
        ),
      });
      console.log("Email sent:", data);
    } catch (error) {
      console.error("Email error:", error);
    }

    return res.json({
      success: true,
      message: "Verification code sent successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: "Verification unsuccessful" });
  }
};
//verification code entering API
export const verificationAPI = async (req, res) => {
  const { code } = req.body;
  const { userId } = req.user;
  const user = await UserModel.findById(userId);
  try {
    if (user.verifyOTP !== code || Date.now() > user.verifyOTPExpiresAt)
      return res.json({ success: false, message: "Invalid or expired OTP" });
    user.verifyOTPExpiresAt = null;
    user.verifyOTP = null;
    user.isVerified = true;
    await user.save();
    return res.json({ success: true, message: "Verification successfull" });
  } catch (error) {
    return res.json({ success: false, message: "Verification unsuccessfull" });
  }
};
//Reset verification
export const resetVerification = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (!user)
      return res.json({ success: false, message: "User dooesn't exist" });
    user.resetVerifyOTP = Math.floor(100000 + Math.random() * 900000);
    user.resetVerifyOTPExpiresAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    try {
      const data = await resend.emails.send({
        from: "Cyrus <onboarding@resend.dev>", // must be verified domain or default resend.dev
        to: user.email,
        subject: "Reset Code",
        html: String(
          resetTemplate.replace("{resetVerificationCode}", user.resetVerifyOTP),
        ),
      });
      console.log("Email sent:", data);
    } catch (error) {
      console.error("Email error:", error);
    }

    return res.json({
      success: true,
      message: "Reset code sent successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: "Reset unsuccessful" });
  }
};
//Reset verification
export const resetVerificationEntering = async (req, res) => {
  const { otp, newPassword } = req.body;
  if (!otp || !newPassword)
    return res.json({ success: false, message: "All fields required" });
  const existingUser = await UserModel.findOne({
    resetVerifyOTP: otp,
  });
  try {
    if (!existingUser)
      return res.json({ success: false, message: "Invalid otp" });
    if (existingUser.resetVerifyOTPExpiresAt < Date.now())
      return res.json({ success: false, messager: "OTP expired" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedPassword;
    existingUser.resetVerifyOTP = null;
    existingUser.resetVerifyOTPExpiresAt = null;
    await existingUser.save();
    return res.json({ success: true, message: "Reset successfull" });
  } catch (error) {
    return res.json({ success: false, message: "Reset unsuccessfull" });
  }
};
//To check authenticated or not
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "User is authenticated" });
  } catch (error) {
    return res.json({ success: false, message: "Not authenticated" });
  }
};
