import { body, validationResult,check,param, query } from "express-validator";
import ErrorHandler from './../utils/utility.js';


//these function simply passed as middleware in routes
export const validate = (req, res, next) => {
	const errors = validationResult(req);
	const errorMessages = errors.array()
    .map((error) => error.msg)
    .join(", ");
	// console.log(errorMessages);

	if (errors.isEmpty()) return next();
    else{
        next(new ErrorHandler(errorMessages,400))
    }
};
//these functions will be called as we call a function and passed as middleware in routes
export const registerValidator = () => [
	body("name", "please enter name").notEmpty(),
	body("username", "please enter username").notEmpty(),
	body("password", "please enter password").notEmpty(),
];

export const loginValidator = () => [
	body("username", "please enter username").notEmpty(),
	body("password", "please enter password").notEmpty(),
];

export const newGroupValidator=()=>[
	body("name", "please enter name").notEmpty(),
	body("members").notEmpty().withMessage("Please enter members")
	.isArray({min:2,max:100}).withMessage("Members must be 2-100"),
]

export const addMemberValidator=()=>[
	body("chatId", "please enter chat ID").notEmpty(),
	body("members").notEmpty().withMessage("Please enter members")
	.isArray({min:1,max:97}).withMessage("Members must be 1-97"),
]


export const removeMemberValidator=()=>[
	body("chatId", "please enter chat ID").notEmpty(),
	body("userId").notEmpty().withMessage("Please enter user ID")
	
]


export const leaveGroupValidator=()=>[
	param("id", "please enter chat ID").notEmpty(),
	
]

export const sendAttachmentValidator=()=>[
	body("chatId", "please enter chat ID").notEmpty(),
	
	
]


export const getMessagesValidator=()=>[
	param("id", "please enter chat ID").notEmpty(),
]

export const getChatDetailsValidator=()=>[
	param("id", "please enter chat ID").notEmpty(),
]



export const renameValidator=()=>[
	param("id", "please enter chat ID").notEmpty(),
	body("name", "Please enter name" ).notEmpty(),
]
  
export const sendRequestValidator=()=>[
	body("userId", "Please enter userID" ).notEmpty(),
]
export const acceptRequestValidator=()=>[
	body("requestId", "Please enter requestId" ).notEmpty(),
	body("accept").notEmpty().withMessage("Please add accept")
	.isBoolean().withMessage("Accept must be Boolean")
]

export const adminLoginValidator=()=>[
	body("secretKey","Please enter secret key").notEmpty()
]