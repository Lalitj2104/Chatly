import jwt from "jsonwebtoken";







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