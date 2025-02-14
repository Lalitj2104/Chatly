import express from "express";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { cookieOptions } from "../utils/features.js";
import ErrorHandler from "../utils/utility.js";

export const newUser = async (req, res) => {
	try {
		const { name, username, password, avatar } = req.body;

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
		const { username } = req.query;
		res.status(200).json({
			success: true,
			message: username,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
