import express from "express";

import {
  clockInStaff,
  clockOutStaff,
  getAllStaffController,
  getStaffProfileController,
  updateStaffProfileController,
} from "../controllers/staffController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  validatorResult,
  updateProfileValidator,
} from "../middlewares/validator.js";

const router = express.Router();

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
