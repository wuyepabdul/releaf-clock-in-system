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

//register a user route
//public
router.post(
  "/register",
  registerValidator,
  validatorResult,
  registerStaffController
);

// login a user route
//public
router.post("/login", signinValidator, validatorResult, authStaffController);

// get user profile route
// private
router.get("/profile", protect, getStaffProfileController);

// get all staff route
router.get("/list", protect, getAllStaffController);

//update user profile route
//private
router.put(
  "/profile",
  protect,
  updateProfileValidator,
  validatorResult,
  updateStaffProfileController
);

// update a user by id route
router.put("/clockin", protect, clockInStaff);

// update a user by id route
router.put("/clockout", protect, clockOutStaff);

export default router;
