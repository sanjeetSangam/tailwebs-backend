import app from "./app.js";
import { db } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 2000;

db()
	.then(() => {
		app.listen(2000, () => {
			console.log("listening on " + `http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log("error while connecting to DB: " + err.message);
	});
