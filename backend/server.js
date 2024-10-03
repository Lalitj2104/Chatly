import app from './app.js'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'


dotenv.config({path:"./config/config.env"})

connectDB()

app.listen(process.env.PORT ||3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT ||3000}`)},
    console.log(`http://localhost:${process.env.PORT}`)
)