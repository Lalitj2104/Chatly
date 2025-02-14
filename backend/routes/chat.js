import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { newGroup,myChats, getMyGroups,addMembers, removeMember , leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from '../controllers/chat.js';
import { attachmentUpload } from '../middlewares/multer.js';
export const cRouter=express.Router();


cRouter.post("/new",isAuthenticated,newGroup)
cRouter.get("/my",isAuthenticated,myChats)
cRouter.get("/my/groups",isAuthenticated,getMyGroups)
cRouter.put("/addMembers",isAuthenticated,addMembers)
cRouter.put("/remove",isAuthenticated,removeMember)
cRouter.delete("/leave/:id",isAuthenticated,leaveGroup)
cRouter.post("/new",isAuthenticated,attachmentUpload,sendAttachments)

cRouter.get("/message/:id",getMessages)

cRouter.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);