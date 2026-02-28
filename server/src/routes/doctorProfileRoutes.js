import express from "express";
import doctorProfileController from "../controllers/doctorProfileController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerDoctorSchema } from "../validators/doctorProfileValidator.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

// Doctor registration route (Public)
router.post(
  "/register",
  validate(registerDoctorSchema),
  doctorProfileController.registerDoctor,
);


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

export default router;
