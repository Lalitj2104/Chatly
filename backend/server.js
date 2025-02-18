import app, { server } from './app.js'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import {v2 as cloudinary} from "cloudinary";

dotenv.config({path:"./config/config.env"})

connectDB()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
server.listen(process.env.PORT ||3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT ||3000}`)},
    console.log(`http://localhost:${process.env.PORT}`)
)