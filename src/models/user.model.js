import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, "Full name is required"],
			minlength: [3, "Full name must be at least 3 characters long"],
			maxlength: [50, "Full name cannot exceed 50 characters"],
		},
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			minlength: [3, "Username must be at least 3 characters long"],
			maxlength: [30, "Username cannot exceed 30 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: [/.+\@.+\..+/, "Please enter a valid email address"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
			maxlength: [100, "Password cannot exceed 100 characters"],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
