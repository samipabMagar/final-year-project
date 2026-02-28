import express from "express";
import doctorProfileController from "../controllers/doctorProfileController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerDoctorSchema } from "../validators/doctorProfileValidator.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerDoctorSchema),
  doctorProfileController.registerDoctor,
);

router.get("/admin/pending",authenticate,authorize("admin"),doctorProfileController.getPendingDoctorRegistrations);
export default router;
