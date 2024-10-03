import express from 'express';
import {getMyProfile, login, logout, newUser, searchUser} from '../controllers/user.js';
import {  singleUpload } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
export const router=express.Router();

router.post('/login',login);
router.post('/new',singleUpload, newUser);
router.get("/myProfile",isAuthenticated ,getMyProfile)
router.get("/logout",isAuthenticated,logout)
router.get("/search",isAuthenticated,searchUser)