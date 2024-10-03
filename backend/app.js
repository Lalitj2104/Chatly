import express from 'express';
import {router} from './routes/user.js';
import cookieParser from 'cookie-parser';

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(cookieParser());
app.use("/user",router)
app.use("/chats",router)
export default app;