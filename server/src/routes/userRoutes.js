import express from "express";
import userController from "../controllers/userController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";

const router = express.Router();

router.post("/register",validate(registerSchema), userController.register);
router.post("/login",validate(loginSchema), userController.login);


export default router;
