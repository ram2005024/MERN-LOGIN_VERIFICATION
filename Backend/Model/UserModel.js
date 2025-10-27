import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyOTP: { type: String, default: "" },
    verifyOTPExpiresAt: { type: Number, default: null },
    resetVerifyOTP: { type: String, default: "" },
    resetVerifyOTPExpiresAt: { type: Number, default: null },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
