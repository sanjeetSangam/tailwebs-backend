import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const options = {
	httpOnly: true,
	secure: true,
};

const newToken = (user) => {
	return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
	});
};

export const login = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	if (!user) throw new ApiError(404, "User does not exist");

	const validPassword = await user.isPasswordCorrect(password);
	if (!validPassword) throw new ApiError(403, "Invalid password");

	const token = newToken(user);
	const loggedUser = await User.findById(user._id).select("-password");

	return res
		.status(200)
		.cookie("accessToken", token, options)
		.json(new ApiResponse(200, { user: loggedUser, token }, "Login success"));
});

export const register = asyncHandler(async (req, res) => {
	let { username, fullName, password, email } = req.body;

	const existedUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
	if (existedUser) throw new ApiError(403, "User already exists with the same username or email");

	const user = await User.create({ username, fullName, password, email });
	const registeredUser = await User.findById(user._id).select("-password");

	return res.status(201).json(new ApiResponse(201, registeredUser, "Registration successful"));
});

export const logout = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.clearCookie("accessToken", options)
		.json(new ApiResponse(200, {}, "User logged out successfully"));
});
