import express from "express";
import { User } from "../models/user.js";
import { emitEvent, sendToken } from "../utils/features.js";
import { cookieOptions } from "../utils/features.js";
import ErrorHandler from "../utils/utility.js";
import { Request } from "./../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from './../models/chat.js';
import { getOtherMember } from './../lib/helper.js';

export const newUser = async (req, res) => {
	try {
		const { name, username, password, avatar } = req.body;
		const file=req.file;
		if (!name || !username || !password || !avatar) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const avatarData = {
			public_id: "12345",
			url: "hjaskduc",
		};

		const user = await User.create({
			name,
			username,
			password,
			avatar: avatarData,
		});

		sendToken(res, user, 201, "User created successfully");
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}
		const user = await User.findOne({ username }).select("+password");
		if (!user) {
			return next(new ErrorHandler("Invalid Username or password", 400));
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return next(new ErrorHandler("Invalid Username or password", 400));
		}
		sendToken(res, user, 200, "Login successful");
	} catch (error) {
		next(error);
	}
};

export const getMyProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user);
		return res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const logout = async (req, res) => {
	try {
		return res
			.status(200)
			.cookie("Chatly-token", "", { ...cookieOptions, maxAge: 0 })
			.json({
				success: true,
				message: "Logged out successfully",
			});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const searchUser = async (req, res) => {
	try {
		const { name = "" } = req.query;

		const myChats = await Chat.find({ groupChat: false, members: req.user });

		const allUsers = myChats.map((chat) => chat.members).flat();

		const allFilteredUser = await User.find({
			_id: { $nin: allUsers },
			name: { $regex: name, $options: "i" },
		});

		const users = allFilteredUser.map(({ _id, name, avatar }) => ({
			_id,
			name,
			avatar: avatar.url,
		}));

		res.status(200).json({
			success: true,
			message: "fetching successful",
			users,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const sendFriendRequest = async (req, res, next) => {
	try {
		const { userId } = req.body;

		const request = await Request.findOne({
			$or: [
				{
					sender: req.user,
					receiver: userId,
				},
				{
					sender: userId,
					receiver: req.user,
				},
			],
		});

		if (request) return next(new ErrorHandler("Request already sent", 400));

		await Request.create({
			sender: req.user,
			receiver: userId,
		});
		emitEvent(req, NEW_REQUEST, [userId]);

		return res.status(200).json({
			success: true,
			message: "Friend request sent",
		});
	} catch (error) {
		next(error);
	}
};

export const acceptFriendRequest = async (req, res, next) => {
	try {
		const { requestId, accept } = req.body;

		const request = await Request.findById(requestId)
			.populate("sender", "name")
			.populate("receiver", "name");
		if(!request) return next(new ErrorHandler("Request not found",404))

		if(request.receiver._id.toString()!==req.user.toString()){
			return next(new ErrorHandler("u are not authorized"),401)
		}
		if(!accept){
			await request.deleteOne();
			return res.status(200).json({
				success:true,
				message:"Friend Request Rejected"
			})
		}
		const members=[request.sender._id,request.receiver._id];

		await Promise.all([
			Chat.create({
				members,
				name:`${request.sender.name}-${request.receiver.name}`
			}),
			request.deleteOne()
		])

		emitEvent(req,REFETCH_CHATS,members);
		res.status(200).json({
			success:true,
			message:"Friend Request Accepted",
			senderId:req.sender._id
		})

	} catch (error) {
		next(error);
	}
};


export const notifications=async(req,res,next)=>{
	try {
		const requests=await Request.find({receiver:req.user})
		.populate("sender",
			"name avatar"
		);
		const allRequest=requests.map(({_id,sender})=>({
			_id,
			sender:{
				_id:sender._id,
				name:sender.name,
				avatar:sender.avatar.url,
			}
		}))
		return res.status(200).json({
			success:true,
			allRequest
		})
	} catch (error) {
		next(error)
	}
}

export const getMyFriends=async(req,res,next)=>{
	try {
		const chatId=req.query.chatId;

		const chats=await Chat.find({members:req.user,
			groupChat:false,
		}).populate("members","name avatar");

		const friends=chats.map(({members})=>{
			const otherUser=getOtherMember(members,req.user)

			return {
				_id:otherUser._id,
				name:otherUser.name,
				avatar:otherUser.avatar.url
			}
		})
		if(chatId){
			const chat=await Chat.findById(chatId);

			const availableFriends=friends.filter((friend)=>!chat.members.includes(friend._id))
			return res.status(200).json({
				success:true,
				availableFriends
			})
		}else{
			return res.status(200).json({
				success:true,
				friends,
			})
		}

	} catch (error) {
		next(error);
	}
}