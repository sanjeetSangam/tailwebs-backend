import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addStudent = asyncHandler(async (req, res) => {
	let { name, subject, marks } = req.body;
	const lowerCaseName = name.toLowerCase();
	const existingStudent = await Student.findOne({
		name: { $regex: new RegExp(`^${lowerCaseName}$`, "i") },
		subject,
	});

	if (existingStudent) {
		existingStudent.marks += Number(marks);
		await existingStudent.save();

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					existingStudent,
					`${existingStudent.name}'s marks updated successfully`
				)
			);
	} else {
		const newStudent = new Student({
			name,
			subject,
			marks: Number(marks),
		});

		const savedStudent = await newStudent.save();

		return res
			.status(201)
			.json(
				new ApiResponse(201, savedStudent, `${newStudent.name}'s marks added successfully`)
			);
	}
});

export const editStudent = asyncHandler(async (req, res) => {
	const { name, subject, marks } = req.body;
	const { studentId } = req.params;

	const updateRequest = {};
	if (name) updateRequest.name = name;
	if (subject) updateRequest.subject = subject;

	if (typeof marks === "number") updateRequest.marks = Number(marks);

	if (!Object.keys(updateRequest).length)
		throw new ApiError(401, "Please provide data to update");

	const student = await Student.findByIdAndUpdate(studentId, updateRequest, {
		new: true,
		runValidators: true,
	});

	if (!student) {
		throw new ApiError(404, "Student not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, student, `${student.name} updated successfully`));
});

export const deleteStudent = asyncHandler(async (req, res) => {
	const { studentId } = req.params;
	const student = await Student.findByIdAndDelete(studentId);
	if (!student) throw new ApiError(403, "Student not found");
	return res.status(200).json(new ApiResponse(200, {}, `${student.name} deleted successfully`));
});

export const getStudents = asyncHandler(async (req, res) => {
	const students = await Student.find();
	return res.status(200).json(new ApiResponse(200, students, "data fetched successfully"));
});
