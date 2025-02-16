import express from "express";
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from "../controllers/admin.js";
import { adminLoginValidator, validate } from "../lib/validators.js";
import { adminOnly } from "../middlewares/adminAuth.js";



export const adminRouter = express.Router();



adminRouter.post("/verify",adminLoginValidator(),validate,adminLogin)
adminRouter.get("/logout")
adminRouter.use(adminOnly);
adminRouter.get("/",getAdminData);
adminRouter.get("/users",allUsers)
adminRouter.get("/chats",allChats)
adminRouter.get("/messages",allMessages)
adminRouter.get("/stats",getDashboardStats)
adminRouter.get("/logout",adminLogout);