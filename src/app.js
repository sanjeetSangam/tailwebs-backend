import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.status(200).json({ message: "OK" });
});

// routes
import userRouter from "./routes/user.route.js";
import studentRouter from "./routes/student.route.js";

app.use("/auth/v1/user", userRouter);
app.use("/auth/v1/student", studentRouter);

app.use(errorHandler);

export default app;
