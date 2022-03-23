const asyncHandler = require("express-async-handler");
const Clockin = require("../models/clockinModel");
const Clockout = require("../models/clockoutModel");

const todaysDate = new Date();

module.exports.clockInStaff = asyncHandler(async (req, res) => {
  try {
    const clockins = await Clockin.find({ staff: req.user._id });
    if (clockins.length > 0) {
      clockins.map(async (clockin) => {
        if (clockin.createdAt.toDateString() === todaysDate.toDateString()) {
          res
            .status(400)
            .json({ message: "You have already Clocked In For Today" });
          return;
        } else {
          const newClockIn = new Clockin({
            staff: req.user._id,
            staffId: req.body.staffId,
            clockedIn: true,
            clockedInAt: new Date(),
          });
          const savedClockin = await newClockIn.save();
          return res.json(savedClockin);
        }
      });
    } else {
      const newClockIn = new Clockin({
        staff: req.user._id,
        staffId: req.body.staffId,
        clockedIn: true,
        clockedInAt: new Date(),
      });
      const savedClockin = await newClockIn.save();
      return res.json(savedClockin);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error: try again later" });
  }
});

module.exports.clockOutStaff = asyncHandler(async (req, res) => {
  try {
    const clockins = await Clockin.find({ staff: req.user._id });
    if (clockins.length > 0) {
      clockins.map(async (clockin) => {
        if (
          clockin.clockedOut &&
          clockin.clockedOutAt.toDateString() === todaysDate.toDateString()
        ) {
          return res
            .status(400)
            .json({ message: "You have already Clocked Out For Today" });
        } else {
          clockin.clockedOut = true;
          clockin.clockedOutAt = new Date();
          await clockin.save();
          return res.status(201).json({ message: "Clockout successfull" });
        }
      });
    } else {
      const newClockin = new Clockin({
        staff: req.user._id,
        staffId: req.body.staffId,
        clockedIn: false,
        clockedOut: true,
        clockedOutAt: new Date(),
      });
      await newClockin.save();
      return res.json({ message: "Clockout successfull" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error: try again later" });
  }
});

module.exports.getTodaysClockinsController = asyncHandler(async (req, res) => {
  try {
    const clockins = await Clockin.find({})
      .populate("staff", "-password")
      .sort({ createdAt: -1 });

    const result = clockins.filter((clockin) => {
      const clockinDate = new Date(clockin.createdAt);
      return clockinDate.toDateString() === todaysDate.toDateString();
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error, try again later" });
  }
});

module.exports.getAllClockinsController = asyncHandler(async (req, res) => {
  try {
    const clockins = await Clockin.find({})
      .populate("staff", "-password")
      .sort({ createdAt: -1 });

    res.json(clockins);
  } catch (error) {
    res.status(500).json({ message: "Server error, try again later" });
  }
});

module.exports.getAllClockoutsController = asyncHandler(async (req, res) => {
  try {
    const clockouts = await Clockout.find({})
      .populate("staff", "-password")
      .sort({ createdAt: -1 });

    res.json({ clockouts });
  } catch (error) {
    res.status(500).json({ message: "Server error, try again later" });
  }
});
