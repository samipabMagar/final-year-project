import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
import brandController from "../controllers/brandController.js";

const router = express.Router();

router.post("/", authenticate, authorize("admin"), brandController.createBrand);

export default router;
