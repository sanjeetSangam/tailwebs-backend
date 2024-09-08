import mongoose, { Schema } from "mongoose";

const subjectsEnum = ["Math", "Science", "English", "History", "Geography", "Hindi", "ECA"];
const enumMessage = `Subject must be one of the following: ${subjectsEnum.join(", ")}`;

const studentSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			minlength: [3, "Name must be at least 3 characters long"],
			maxlength: [50, "Name cannot exceed 50 characters"],
		},
		subject: {
			type: String,
			required: [true, "Subject is required"],
			enum: {
				values: subjectsEnum,
				message: enumMessage,
			},
		},
		marks: {
			type: Number,
			required: [true, "Mark is required"],
			min: [0, "Marks must be at least 0"],
			max: [100, "Marks must be less or equal than 100"],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Student = mongoose.model("Student", studentSchema);
