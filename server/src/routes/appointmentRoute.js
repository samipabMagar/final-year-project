import express from "express";
import appointmentController from "../controllers/appointmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
	createAppointmentSchema,
	confirmAppointmentSchema,
} from "../validators/appointmentValidator.js";

const router = express.Router();

router.post(
	"/",
	authenticate,
	authorize("user"),
	validate(createAppointmentSchema),
	appointmentController.createAppointment,
);

router.get(
  "/my",
  authenticate,
  authorize("user", "doctor"),
  appointmentController.getMyAppointments,
);

router.patch(
  "/:appointmentId/confirm",
  authenticate,
  authorize("doctor"),
  validate(confirmAppointmentSchema),
  appointmentController.confirmAppointment,
);

export default router;
