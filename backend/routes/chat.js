import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { newGroup,myChats, getMyGroups,addMembers, removeMember , leaveGroup } from '../controllers/chat';
import { attachmentUpload } from '../middlewares/multer';
export const router=express.Router();


app.post("/new",isAuthenticated,newGroup)
app.get("/my",isAuthenticated,myChats)
app.get("/my/groups",isAuthenticated,getMyGroups)
app.put("/addmembers",isAuthenticated,addMembers)
app.put("/remove",isAuthenticated,removeMember)
app.delete("/leave/:id",isAuthenticated,leaveGroup)
app.post("/new",isAuthenticated,attachmentUpload,sendAttachments)