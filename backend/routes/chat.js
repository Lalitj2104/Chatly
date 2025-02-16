import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
	newGroup,
	myChats,
	getMyGroups,
	addMembers,
	removeMember,
	leaveGroup,
	sendAttachments,
	getChatDetails,
	renameGroup,
	deleteChat,
	getMessages,
} from "../controllers/chat.js";
import { attachmentUpload } from "../middlewares/multer.js";
import {
	addMemberValidator,
	getChatDetailsValidator,
	getMessagesValidator,
	leaveGroupValidator,
	newGroupValidator,
	removeMemberValidator,
	renameValidator,
	sendAttachmentValidator,
	validate,
} from "../lib/validators.js";
export const cRouter = express.Router();

cRouter.post("/new", isAuthenticated, newGroupValidator(), validate, newGroup);
cRouter.get("/my", isAuthenticated, myChats);
cRouter.get("/my/groups", isAuthenticated, getMyGroups);
cRouter.put(
	"/addMembers",
	isAuthenticated,
	addMemberValidator(),
	validate,
	addMembers,
);
cRouter.put(
	"/remove",
	isAuthenticated,
	removeMemberValidator(),
	validate,
	removeMember,
);
cRouter.delete(
	"/leave/:id",
	isAuthenticated,
	leaveGroupValidator(),
	validate,
	leaveGroup,
);
cRouter.post(
	"/new",
	isAuthenticated,
	attachmentUpload,
	sendAttachmentValidator(),
	validate,
	sendAttachments,
);

cRouter.get("/message/:id", getMessagesValidator(), validate, getMessages);

cRouter
	.route("/:id")
	.get(getChatDetailsValidator(), validate, getChatDetails)
	.put(renameValidator(),validate,renameGroup)
	.delete(getChatDetailsValidator(), validate,deleteChat);
