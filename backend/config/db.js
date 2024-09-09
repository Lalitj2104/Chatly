import mongoose from "mongoose";

export const connectDB = async ()=>{
    mongoose.connect(process.env.DB_URI)
    .then((data)=>{
        console.log("Connected to the database: ${data.connection.host}")
    })
    .catch((error)=>{
        console.error(error)
    })
}