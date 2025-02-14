import express from 'express';
import {router} from './routes/user.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import { cRouter } from './routes/chat.js';

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(cookieParser());
app.use("/user",router)
app.use("/chats",cRouter)
app.use(errorMiddleware)
export default app;