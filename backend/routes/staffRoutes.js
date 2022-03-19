const express = require("express");
const { clockInStaff, clockOutStaff, getAllClockinsController, getAllClockoutsController } = require("../controllers/clockinController.js");

const {
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

router.get('/clockins', getAllClockinsController)

router.get('/clockouts', getAllClockoutsController)

router.put(
  "/profile",
  protect,
  updateProfileValidator,
  validatorResult,
  updateStaffProfileController
);

router.post("/clockin", protect, clockInStaff);

router.post("/clockout", protect, clockOutStaff);

module.exports = router;
