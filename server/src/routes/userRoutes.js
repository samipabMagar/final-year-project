import express from "express";
import userController from "../controllers/userController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);

// Protected routes (require authentication)
router.get("/profile", authenticate, userController.getCurrentUser);


export default router;
