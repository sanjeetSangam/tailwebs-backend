import mongoose from "mongoose";

export const db = async () => {
	try {
		const connection = await mongoose.connect(`${process.env.MONGODB_URI}/tailwebs`);
		console.log("connection established on " + connection.connection.host);
	} catch (error) {
		console.log("mongodb connection error: " + error);
		process.exit(1);
	}
};
