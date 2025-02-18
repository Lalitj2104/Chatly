import express from 'express';
import {acceptFriendRequest, getMyFriends, getMyProfile, login, logout, newUser, notifications, searchUser, sendFriendRequest} from '../controllers/user.js';
import {  singleUpload } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validate } from '../lib/validators.js';

export const router=express.Router();

router.post('/login',loginValidator(),validate,login);
router.post('/signup',singleUpload,registerValidator(),validate, newUser);
router.get("/me",isAuthenticated ,getMyProfile)
router.get("/logout",isAuthenticated,logout)
router.get("/search",isAuthenticated,searchUser)
router.get("/sendRequest",isAuthenticated,sendRequestValidator(),validate,sendFriendRequest)
router.get("/sendRequest",isAuthenticated,acceptRequestValidator(),validate,acceptFriendRequest)
router.get("/notifications",isAuthenticated,notifications);
router.get("/friends",isAuthenticated,getMyFriends);