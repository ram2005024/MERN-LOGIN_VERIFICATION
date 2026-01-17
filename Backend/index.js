import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { router } from "./Routes/auth.routes.js";
import { userRouter } from "./Routes/user.route.js";
const PORT = process.env.PORT || 8000;
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/auth", router);
app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
