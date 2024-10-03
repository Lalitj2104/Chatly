import ErrorHanadler from "../utils/utility.js";




export const  isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies["Chatly-token"];
        if(!token) return next(new ErrorHanadler("please Login",400));
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded._id;
        next();
    } catch (error) {

        
    }
}