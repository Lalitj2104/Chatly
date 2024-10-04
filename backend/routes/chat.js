import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { newGroup,myChats, getMyGroups,addMembers } from '../controllers/chat';
export const router=express.Router();


app.post("/new",isAuthenticated,newGroup)
app.get("/my",isAuthenticated,myChats)
app.get("/my/groups",isAuthenticated,getMyGroups)
app.put("/addmembers",addMembers)