const { checkClockIn } = require("../helpers/checkClockin");
const asyncHandler = require("express-async-handler");
const Staff = require("../models/staffModel");
const generateToken = require("../utils/generateToken");
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
        } else {
          const newClockIn = new Clockin({
            staff: req.user._id,
            staffId: req.body.staffId,
            clockedIn: true,
            clockedInAt: todaysDate,
          });
          const savedClockin = await newClockIn.save();
          res.json(savedClockin);
        }
      });
    }else {
      const newClockIn = new Clockin({
        staff: req.user._id,
        staffId: req.body.staffId,
        clockedIn: true,
        clockedInAt: todaysDate,
      });
      const savedClockin = await newClockIn.save();
      res.json(savedClockin);
    }

    // if (staff) {
    //   // const alreadyClockedIn = staff.clockIns.find(
    //   //   (c) =>
    //   //     c.clockedInAt.getDate().toString() ===
    //   //     currentTime.getDate().toString()
    //   // );

    //   if (checkClockIn(staff)) {
    //     res
    //       .status(400)
    //       .json({ message: 'You have already Clocked In For Today' });
    //   } else {
    //     const clockIn = {
    //       clockedInAt: currentTime,
    //       staff: req.user._id,
    //       clockedIn:true,
    //     };

    //     staff.clockIns.push(clockIn);
    //     await staff.save();

    //     res.status(201).json({
    //       _id: staff._id,
    //       staffId: staff.staffId,
    //       name: staff.name,
    //       slug: staff.slug,
    //       email: staff.email,
    //       department: staff.department,
    //       clockIns: staff.clockIns,
    //       clockIns: staff.clockIns,
    //       isAdmin: staff.isAdmin,
    //       token: generateToken(staff._id),
    //     });
    //   }
    // } else {
    //   console.log('staff does not exist');
    //   res.status(404).json({ message: ' Invalid Staff ID' });
    // }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error: try again later" });
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
          res
            .status(400)
            .json({ message: "You have already Clocked Out For Today" });
        } else {
          clockin.clockedOut = true;
          clockin.clockedOutAt = todaysDate;
          await clockin.save();
          res.json({ message: "Clockout successfull" });
        }
      });
    } else {
      const newClockin = new Clockin({
        staff: req.user._id,
        staffId: req.body.staffId,
        clockedIn: false,
        clockedOut: true,
        clockedOutAt: todaysDate,
      });
      await newClockin.save();
      res.json({ message: "Clockout successfull" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error: try again later" });
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
