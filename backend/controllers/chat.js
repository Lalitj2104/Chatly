import express from "express";
import { Chat } from "../models/chat.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import {
	ALERT,
	NEW_ATTACHMENT,
	NEW_MESSAGE_ALERT,
	REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility.js";
import { Message } from "../models/message.js";

export const newGroup = async (req, res, next) => {
	try {
		const { name, members } = req.body;
		if (!name || !members) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		if (members.length < 2) {
			return res.status(400).json({
				success: false,
				message: "Group should have atleast 3 members",
			});
		}
		const allMembers = [...members, req.user];
		await Chat.create({
			name,
			groupChat: true,
			creator: req.user,
			members: allMembers,
		});
		emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
		emitEvent(req, REFETCH_CHATS, members);

		res.status(201).json({
			success: true,
			message: "Group created successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const myChats = async (req, res, next) => {
	try {
		const chats = await Chat.find({ members: req.user }).populate(
			"members",
			"name  avatar",
		);

		if (!chats) {
			return res.status(400).json({
				success: false,
				message: "No chats found",
			});
		}
		const transformChat = chats.map((chat) => {
			return {
				_id: chat._id,
				groupChat: chat.groupChat,
				name: groupChat
					? chat.name
					: getOtherMember(chat.members, req.user).name,
				avatar: groupChat
					? members.slice(0, 3).map(({ avatar }) => avatar.url)
					: [getOtherMember(chat.members, req.user).avatar.url],
				members: chat.members.reduce((prev, curr) => {
					if (curr.chat._id.toString() !== req.user.toString()) {
						prev.push(curr.chat._id);
					}
					return prev;
				}, []),
			};
		});

		return res.status(200).json({
			success: true,
			chats,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getMyGroups = async (req, res, next) => {
	try {
		const chats = await Chat.find({
			members: req.user,
			groupChat: true,
			creator: req.user,
		}).populate("members", "name avatar");

		if (!chats) {
			return res.status(400).json({
				success: false,
				message: "No groups found",
			});
		}

		const groups = chats.map(({ members, _id, groupChat, name }) => ({
			_id,
			groupChat,
			name,
			avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
		}));
		return res.status(200).json({
			success: true,
			groups,
		});
	} catch (error) {
		next(error);
	}
};

export const addMembers = async (req, res, next) => {
	try {
		const { chatId, members } = req.body;
		if (!chatId || !members) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}
		if (members.length < 1) {
			return res.status(400).json({
				success: false,
				message: "No members to add",
			});
		}

		const chat = await Chat.findById(chatId);
		if (!chat) {
			return res.status(404).json({
				success: false,
				message: "Chat not found",
			});
		}
		if (!chat.groupChat) {
			return res.status(400).json({
				success: false,
				message: "This is not a group chat",
			});
		}
		if (chat.creator.toString() !== req.user.toString()) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to add members",
			});
		}
		const allNewMembersPromise = members.map((i) =>
			UserActivation.findById(i, "name"),
		);
		const allNewMembers = await Promise.all(allNewMembersPromise);
		const uniques = allNewMembers
			.filter((i) => !chat.members.includes(i._id.toString()))
			.map((i) => i._id);

		chat.members.push(...allNewMembers.map((i) => i._id));
		if (chat.members.length > 80) {
			return res.status(400).json({
				success: false,
				message: "Members limit exceeded",
			});
		}

		await chat.save();

		const allUserName = allNewMembers.map((i) => i.name).join(",");
		emitEvent(
			req,
			ALERT,
			chat.members,
			`${allUserName} added to ${chat.name} group`,
		);

		res.status(200).json({
			success: true,
			message: "Members added successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const removeMember = async (req, res, next) => {
	try {
		const { userId, chatId } = req.body;
		if (!userId || !chatId) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const [chat, userRemoved] = await Promise.all([
			Chat.findById(chatId),
			User.findById(userId, "name"),
		]);
		if (!chat) {
			return res.status(404).json({
				success: false,
				message: "Chat not found",
			});
		}
		if (!groupChat) {
			return res.status(400).json({
				success: false,
				message: "This is not a group chat",
			});
		}
		if (!userRemoved) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		if (chat.members.length < 3) {
			return res.status(400).json({
				success: false,
				message: "Group should have atleast 2 members",
			});
		}
		chat.members = chat.members.filter(
			(i) => i.toString() !== userId.toString(),
		);
		await chat.save();
		emitEvent(
			req,
			ALERT,
			chat.members,
			`${userRemoved.name} removed from ${chat.name} group`,
		);
		emitEvent(req, REFETCH_CHATS, chat.members);
		res.status(200).json({
			success: true,
			message: "Member removed successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const leaveGroup = async (req, res, next) => {
	try {
		const chatId = req.params.id;
		if (!chatId) {
			return res.status(400).json({
				success: false,
				message: "Chat id is required",
			});
		}
		const chat = await Chat.findById(chatId);
		if (!chat) {
			return res.status(404).json({
				success: false,
				message: "Chat not found",
			});
		}
		if (!chat.groupChat) {
			return res.status(400).json({
				success: false,
				message: "This is not a group chat",
			});
		}
		const remainingMembers = chat.members.filter(
			(i) => i.toString() !== req.user.toString(),
		);
		if (chat.creator.toString() === req.user.toString()) {
			const newCreator = remainingMembers[0];
			chat.creator = newCreator;
		}

		chat.members = remainingMembers;
		const user = await User.findById(req.user, "name");
		await chat.save();
		emitEvent(req, ALERT, chat.members, `${user.name} left ${chat.name} group`);

		res.status(200).json({
			success: true,
			message: " Member removed successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const sendAttachments = async (req, res, next) => {
	try {
		const { chatId } = req.body;
		const file = req.files || [];

		if(file.length<1){
			return next(new ErrorHandler("Please upload Attachments",400))
		}
		if(file.length>5){
			return next(new ErrorHandler("Files can't be more than 5",400))
		}
		if (!chatId) {
			return res.status(400).json({
				success: false,
				message: "Chat id is required",
			});
		}
		const [chat, me] = await Promise.all([
			Chat.findById(chatId),
			User.findById(req.user, "name"),
		]);

		const files = req.files || [];

		if (!chat) {
			return next(new ErrorHandler("chat not found", 404));
		}
		if (files.length < 1) {
			return next(new ErrorHandler("Please provide attachments", 400));
		}

		//upload files
		const attachments = {};

		const messageForRealTime = {
			content: "",
			attachments,
			sender: {
				_id: me._id,
				name: me.name,
			},
			chat: chatId,
		};

		const messageForDB = {
			content: "",
			attachments,
			sender: me._id,
			chat: chatId,
		};
		const message = await Message.create({ messageForDB });
		emitEvent(req, NEW_ATTACHMENT, chat.members, {
			message: messageForRealTime,
			chatId,
		});
		emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

		return res.status(200).json({
			success: true,
			message,
		});
	} catch (error) {
		next(error);
	}
};

export const getChatDetails = async (req, res, next) => {
	try {
		if (req.query.populate === "true") {
			const chat = await Chat.findById(req.params.id)
				.populate("members", "name avatar")
				.lean();
			if (!chat) return next(new ErrorHandler("chat not found", 404));
			chat.members = chat.members.map(({ _id, name, avatar }) => ({
				_id,
				name,
				avatar: avatar.url,
			}));
			return res.status(200).json({
				success: true,
				chat,
			});
		} else {
			const chat = await Chat.findById(req.params.id);
			if (!chat) return next(new ErrorHandler("chat not found", 404));
			return res.status(200).json({
				success: true,
				chat,
			});
		}
	} catch (error) {
		next(error);
	}
};

export const renameGroup = async (req, res, next) => {
	try {
		const chatId = req.params.id;
		const { name } = req.body;

		const chat = await Chat.findById(chatId);

		if (!chat) return next(new ErrorHandler("chat not found", 404));

		if (!chat.groupChat) {
			return next(new ErrorHandler("This is not a group chat", 400));
		}

		if (chat.creator.toString() !== req.user.toString()) {
			return next(
				new ErrorHandler("You are not allowed to rename the group", 403),
			);
		}

		chat.name = name;
		await chat.save();

		emitEvent(req, REFETCH_CHATS, chat.members);

		return res.status(200).json({
			success: true,
			message: "Group renamed successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const deleteChat = async (req, res, next) => {
	try {
		const chatId = req.params.id;

		const chat = await Chat.findById(chatId);

		if (!chat) return next(new ErrorHandler("chat not found", 404));

		const members = chat.members;
		if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
			return next(
				new ErrorHandler("you are not allowed to delete the group", 403),
			);
		}

		if (chat.groupChat && chat.members.includes(req.user.toString())) {
			return next(
				new ErrorHandler("you are not allowed to delete the chat", 403),
			);
		}

		// cloudinary delete files

		const messageWithAttachments = await Message.find({
			chat: chatId,
			attachments: { $exists: true, $ne: [] },
		});

		const public_ids = [];

		messageWithAttachments.forEach(({ attachments }) => {
			attachments.forEach(({ public_id }) => {
				public_ids.push(public_id);
			});
		});

		await Promise.all([
			deleteFilesFromCloudinary(public_ids),
			chat.deleteOne(),
			Message.deleteMany({ chat: chatId }),
		]);

		emitEvent(req, REFETCH_CHATS, members);

		return res.status(200).json({
			success: true,
			message: "chat deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const getMessages = async (req, res, next) => {
	try {
		const chatId = req.params.id;
		const { page = 1 } = req.query;
		const limit = 20;
		const [messages, totalMessagesCount] = await Promise.all([
			Message.find({ chat: chatId })
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(limit)
				.populate("sender", "name")
				.lean(),
			Message.countDocuments({ chat: chatId }),
		]);
		const totalPages = Math.cell(totalMessagesCount / limit) || 0;
		return res.status(200).json({
			success: true,
			messages: messages.reverse(),
			totalPages,
		});
	} catch (error) {
		next(error);
	}
};
