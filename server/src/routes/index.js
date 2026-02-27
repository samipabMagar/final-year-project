import express from "express";
import userRoutes from "./userRoutes.js";
import doctorRegistrationRoutes from "./doctorRegistrationRoutes.js";

const router = express.Router();

// Mount routes
router.use("/users", userRoutes);
router.use("/doctors", doctorRegistrationRoutes);

export default router;
