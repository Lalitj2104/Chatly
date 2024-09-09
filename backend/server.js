import app from './app'
import dotenv from 'dotenv'
import {connectDB} from './config/db'


dotenv.config({path:"./config/config.env"})

connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)},
    console.log(`http://localhost:${process.env.PORT}`)
)