import express from "express";
import {
  authenticateStaff,
  createStaff,
} from "../controllers/authController.js";

const router = express.Router();

//create a staff route
router.post("/create", createStaff);

// athenticate staff
router.post("/login", authenticateStaff);

export default router;
