import express from "express";
import {
  authStaffController,
  registerStaffController,
} from "../controllers/authController.js";
import {
  registerValidator,
  signinValidator,
  validatorResult,
} from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validatorResult,
  registerStaffController
);

router.post("/login", signinValidator, validatorResult, authStaffController);

export default router;
