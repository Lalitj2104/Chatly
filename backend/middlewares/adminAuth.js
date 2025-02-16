import ErrorHandler from "../utils/utility.js";

export const adminOnly = async (req, res, next) => {
	try {
		const token = req.cookies["Chatly-admin-token"];
		if (!token) return next(new ErrorHandler("please Login to access the resource", 400));
		const adminId = jwt.verify(token, process.env.JWT_SECRET);
		const isMatch=adminId===process.env.secretKey;

		if(!isMatch){
			return next(new ErrorHandler("invalid admin key",401))
		}
		next();
	} catch (error) {
        next(error);
    }
};