import { Router } from "express";
import {
	addStudent,
	deleteStudent,
	editStudent,
	getStudents,
} from "../controllers/student.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyAuth);

router.route("/create").post(addStudent);
router.route("/edit/:studentId").patch(editStudent);
router.route("/get").get(getStudents);
router.route("/delete/:studentId").delete(deleteStudent);

export default router;
