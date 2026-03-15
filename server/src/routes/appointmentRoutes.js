import express from "express";
import appointmentController from "../controllers/appointmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  createAppointmentSchema,
  confirmAppointmentSchema,
  cancelAppointmentSchema,
} from "../validators/appointmentValidator.js";

const router = express.Router();

// User can book an appointment
router.post(
  "/",
  authenticate,
  authorize("user"),
  validate(createAppointmentSchema),
  appointmentController.createAppointment,
);

// User can view their appointments
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
router.patch(
  "/:appointmentId/complete",
  authenticate,
  authorize("doctor"),
  appointmentController.completeAppointment,
);
router.patch(
  "/:appointmentId/reject",
  authenticate,
  authorize("doctor"),
  appointmentController.rejectAppointment,
);
router.patch(
  "/:appointmentId/cancel",
  authenticate,
  authorize("user", "doctor", "admin"),
  validate(cancelAppointmentSchema),
  appointmentController.cancelAppointment,
);

// Admin can view all appointments
router.get("/", authenticate, authorize("admin"), appointmentController.getAllAppointmentsForAdmin);

export default router;
