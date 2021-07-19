const express = require("express");
const {
  authStaffController,
  registerStaffController,
} = require("../controllers/authController.js");
const {
  registerValidator,
  signinValidator,
  validatorResult,
} = require("../middlewares/validator.js");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validatorResult,
  registerStaffController
);

router.post("/login", signinValidator, validatorResult, authStaffController);

module.exports = router;
