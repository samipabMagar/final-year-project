import express from "express";
import doctorProfileController from "../controllers/doctorProfileController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerDoctorSchema } from "../validators/doctorProfileValidator.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerDoctorSchema),
  doctorProfileController.registerDoctor,
);

export default router;
