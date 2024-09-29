import express from 'express';
import {router} from './routes/user.js';
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user",router)
export default app;