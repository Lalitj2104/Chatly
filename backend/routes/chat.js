import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
export const router=express.Router();


app.post("/new",isAuthenticated,newGroup)
