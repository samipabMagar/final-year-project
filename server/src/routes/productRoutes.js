import express from "express";
import productController from "../controllers/productController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
import { createProductSchema } from "../validators/productValidator.js";
import { validate } from "../middlewares/validateMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES - Anyone can view products
router.get("/", productController.getAllProducts);

router.post("/",authenticate,authorize("admin"),validate(createProductSchema),productController.createProduct);

export default router;