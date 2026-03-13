import express from "express";
import appointmentController from "../controllers/appointmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createAppointmentSchema } from "../validators/appointmentValidator.js";

const router = express.Router();

router.post(
	"/",
	authenticate,
	authorize("user"),
	validate(createAppointmentSchema),
	appointmentController.createAppointment,
);

export default router;
