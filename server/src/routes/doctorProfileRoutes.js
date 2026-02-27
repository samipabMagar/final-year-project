import express from "express";
import doctorProfileController from "../controllers/doctorProfileController.js";

const router = express.Router();

router.post("/register",doctorProfileController.registerDoctor); 

export default router;