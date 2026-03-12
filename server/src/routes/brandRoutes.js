import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
import brandController from "../controllers/brandController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createBrandSchema } from "../validators/brandValidator.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createBrandSchema),
  brandController.createBrand,
);
router;

export default router;
