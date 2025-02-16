import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { cookieOptions } from "../utils/features.js";
import ErrorHandler from "../utils/utility.js";
import jwt  from 'jsonwebtoken';



export const adminLogin=async(req,res,next)=>{
	try {
		const {secretKey}=req.body

		const isMatch=secretKey===process.env.secretKey;

		if(!isMatch){
			return next(new ErrorHandler("invalid admin key",401))
		}

		const token=jwt.sign(secretKey,process.env.JWT_SECRET);

		return res.status(200).cookie("chatly-admin-token",token,{...cookieOptions,maxAge:1000*60*15}).json({
			success:"true",
			message:"Authentication successful"
		})


	} catch (error) {
		next(error)
	}
}


export const getAdminData=async(req,res,next)=>{
	try {
		return res.status(200).json({
			admin:true,
		})
	} catch (error) {
		next(error);
	}
}


export const allUsers = async (req, res, next) => {
	try {
		const users = await User.find({});

		const transformedUsers = await Promise.all(
			users.map(async ({ name, username, avatar, _id }) => {
				const [groups, friends] = await Promise.all([
					Chat.countDocuments({
						groupChat: true,
						members: _id,
					}),
					Chat.countDocuments({
						groupChat: false,
						members: _id,
					}),
				]);
				return {
					name,
					username,
					avatar: avatar.url,
					_id,
					groups,
					friends,
				};
			}),
		);
		return res.status(200).json({
			status: "success",
			users: transformedUsers,
		});
	} catch (error) {
		next(error);
	}
};

export const allChats = async (req, res, next) => {
	try {
		const chats = await Chat.find({})
			.populate("members", "name avatar")
			.populate("creator", "name avatar");

		const transformChat = await Promise.all(
			chats.map(async ({ members, _id, groupChat, name, creator }) => {
				const totalMessages = await Message.countDocuments({ chat: _id });
				return {
					_id,
					groupChat,
					name,
					avatar: members.slice(0, 3).map((member) => member.avatar.url),
					members: members.map(({ _id, name, avatar }) => ({
						_id,
						name,
						avatar: avatar.url,
					})),
					creator: {
						name: creator?.name || "None",
						avatar: creator?.avatar.url || "",
					},
					totalMembers: members.length,
					totalMessages,
				};
			}),
		);

		return res.status(200).json({
			success: "true",
			chats: transformChat,
		});
	} catch (error) {
		next(error);
	}
};

export const allMessages = async (req, res, next) => {
	try {
		const messages = await Message.find({})
			.populate("sender", "name avatar")
			.populate("chat", "groupChat");

		const transformedMessages = messages.map(
			({ content, attachments, _id, sender, createdAt, chat }) => ({
				_id,
				attachments,
				content,
				createdAt,
				chat: chat._id,
				groupChat: chat.groupChat,
				sender: {
					_id: sender._id,
					name: sender.name,
					avatar: sender.avatar.url,
				},
			}),
		);

		return res.status(200).json({
			success: true,
			messages: transformedMessages,
		});
	} catch (error) {
		next(error);
	}
};

export const getDashboardStats = async (req, res, next) => {
	try {
		const [groupsCount, usersCount, messagesCount, TotalChatsCount] =
			await Promise.all([
				Chat.countDocuments({ groupChat: true }),
				User.countDocuments(),
				Message.countDocuments(),
				Chat.countDocuments(),
			]);
		const today = new Date();
		const last7days = new Date();
		last7days.setDate(last7days.getDate - 7);

		const last7DaysMessages = await Message.find({
			createdAt: {
				$gte: last7days,
				$lte: today,
			},
		}).select("createdAt");

		const messages = new Array(7).fill(0);

        last7DaysMessages.forEach(message=>{
            const indexApprox=(today.geyTime()-message.createdAt.getTime())/(100*60*60*24);
			const index=Math.floor(indexApprox);

			messages[6-index]++;
        })

		const stats = {
			groupsCount,
			usersCount,
			messagesCount,
			TotalChatsCount,
			messagesChart: messages,
		};
		return res.status(200).json({
			success: true,
			stats,
		});
	} catch (error) {
		next(error);
	}
};

export const adminLogout=async(req,res,next)=>{
	try {
		return res.status(200).cookie("chatly-admin-token","",{...cookieOptions,maxAge:0}).json({
			success:"true",
			message:"admin logout successful"
		})
	} catch (error) {
		next(error)
	}
}
