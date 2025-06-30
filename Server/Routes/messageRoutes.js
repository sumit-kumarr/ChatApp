import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getMessage, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controller/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users" , protectRoute , getUsersForSidebar);
messageRouter.put("/mark/:id",protectRoute , markMessageAsSeen);
messageRouter.post("/send/:id" , protectRoute , sendMessage);
messageRouter.get("/:id",protectRoute , getMessage);

export default messageRouter;
