import express from 'express';
import {login, newUser} from '../controllers/user.js';
export const router=express.Router();

router.post('/login',login);
router.post('/new',newUser);