import express from "express";
import userController from "../controllers/userController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { changePasswordSchema, loginSchema, registerSchema, updateProfileSchema } from "../validators/userValidator.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);

// Protected routes (require authentication)
router.get("/profile", authenticate, userController.getCurrentUser);
router.post("/logout", authenticate, userController.logout);
router.put("/profile", authenticate,validate(updateProfileSchema), userController.updateProfile);
router.put("/change-password", authenticate, validate(changePasswordSchema), userController.changePassword);

export default router;
