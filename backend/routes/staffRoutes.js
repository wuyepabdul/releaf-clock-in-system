const express = require("express");

const {
  clockInStaff,
  clockOutStaff,
  getAllStaffController,
  getStaffProfileController,
  updateStaffProfileController,
} = require("../controllers/staffController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const {
  validatorResult,
  updateProfileValidator,
} = require("../middlewares/validator.js");

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

module.exports = router;
