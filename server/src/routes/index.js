import express from "express";
import userRoutes from "./userRoutes.js";
import doctorProfileRoutes from "./doctorProfileRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

// Mount routes
router.use("/users", userRoutes);
router.use("/doctors", doctorProfileRoutes);
router.use("/products", productRoutes);

export default router;
