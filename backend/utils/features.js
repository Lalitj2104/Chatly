import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
import { getBase64 } from "../lib/helper.js";

export const cookieOptions = {
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
    secure:true,
}

export const sendToken=(res,user,code,message)=>{
    const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
    res.status(code).cookie("Chatly-token",token,cookieOptions).json({
        success:true,
        message,
        user
    })
}

export const emitEvent=(req,event,users,data)=>{
    console.log("emitting event",event)

}

export const uploadFilesToCloudinary=async(files=[])=>{
    const uploadPromises=files.map((file)=>{
        return new Promise((resolve,reject)=>{
            cloudinary.uploader.upload(getBase64(file),
                {
                    resource_type:"auto",
                    public_id:uuid(),
                },(error,result)=>{
                if(error) reject(error)
                resolve(result)
            })
        })
    })
    try {
        const results=await Promise.all(uploadPromises);
        const formattedResults=results.map((result)=>({
            public_id:result.public_id,
            url:result.secure_url
        }))
        return formattedResults;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteFilesFromCloudinary=async(public_ids)=>{
    
}