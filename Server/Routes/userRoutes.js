import express from "express";
import { checkAuth, login, updateProfile , signup } from "../controller/userController.js";
import { protectRoute } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/update-profile",protectRoute,updateProfile);
userRouter.post("/check",protectRoute,checkAuth);

export default userRouter;