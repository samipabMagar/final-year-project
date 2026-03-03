import express from "express";
import doctorProfileController from "../controllers/doctorProfileController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  registerDoctorSchema,
  updateDoctorProfileSchema,
} from "../validators/doctorProfileValidator.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

// Get all doctors
router.get("/", doctorProfileController.getAllDoctors);

// Doctor registration route (Public)
router.post(
  "/register",
  validate(registerDoctorSchema),
  doctorProfileController.registerDoctor,
);
router.get(
  "/profile",
  authenticate,
  authorize("doctor"),
  doctorProfileController.getMyProfile,
);
router.put(
  "/profile",
  authenticate,
  authorize("doctor"),
  validate(updateDoctorProfileSchema),
  doctorProfileController.updateProfile,
);
router.patch("/profile/availability", authenticate, authorize("doctor"), doctorProfileController.updateAvailability);

// Admin routes for managing doctor registrations
router.get(
  "/admin/pending",
  authenticate,
  authorize("admin"),
  doctorProfileController.getPendingDoctorRegistrations,
);
router.put(
  "/admin/:userId/approve",
  authenticate,
  authorize("admin"),
  doctorProfileController.approveDoctorRegistration,
);
router.put(
  "/admin/:userId/reject",
  authenticate,
  authorize("admin"),
  doctorProfileController.rejectDoctorRegistration,
);

export default router;
