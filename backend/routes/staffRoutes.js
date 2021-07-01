import express from "express";
import {
  authStaffController,
  registerStaffController,
} from "../controllers/authController.js";
import {
  clockInStaff,
  clockOutStaff,
  getAllStaffController,
  getStaffProfileController,
  updateStaffProfileController,
} from "../controllers/staffController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
import {
  signinValidator,
  validatorResult,
  updateProfileValidator,
  registerValidator,
} from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validatorResult,
  registerStaffController
);

router.post("/login", signinValidator, validatorResult, authStaffController);

router.get("/profile", protect, getStaffProfileController);

router.get("/list", protect, getAllStaffController);

router.put(
  "/profile",
  protect,
  updateProfileValidator,
  validatorResult,
  updateStaffProfileController
);

router.put("/clockin", protect, clockInStaff);

router.put("/clockout", protect, clockOutStaff);

export default router;
