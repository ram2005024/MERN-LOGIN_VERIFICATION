import express from "express";
import { getUser } from "../controllers/user.controller.js";
import { userAuth } from "../Middlewares/auth.js";
export const userRouter = express.Router();
userRouter.post("/getUserData", userAuth, getUser);
