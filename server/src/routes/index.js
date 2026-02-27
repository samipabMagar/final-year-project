import express from "express";
import userRoutes from "./userRoutes.js";
import doctorProfileRoutes from "./doctorProfileRoutes.js";

const router = express.Router();

// Mount routes
router.use("/users", userRoutes);
router.use("/doctors", doctorProfileRoutes );

export default router;
