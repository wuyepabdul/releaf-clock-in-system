const { checkClockIn } = require("../helpers/checkClockin");
const asyncHandler = require('express-async-handler');
const Staff = require("../models/staffModel");
const generateToken = require("../utils/generateToken");
const Clockin = require("../models/clockinModel");

module.exports.clockInStaff = asyncHandler(async (req, res) => {
  try {
    const todaysDate = new Date();

    const clockin = await Clockin.findOne({staff : req.user._id})
    if(clockin.createdAt.toDateString() === todaysDate.toDateString()){
        res
          .status(400)
          .json({ message: 'You have already Clocked In For Today' });
    }else{
        const newClockIn = new Clockin({
            staff: req.user._id,
            clockedIn:true,
          });
        const savedClockin = await newClockIn.save()
        res.json(savedClockin)
        console.log('saved clockin',savedClockin)
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
    res.status(500).json({ message: 'Server error: try again later' });
  }
});

module.exports.clockOutStaff = asyncHandler(async (req, res) => {
  try {
    const { staffId } = req.body;
    const currentTime = new Date();
    const staff = await Staff.findOne({ staffId });

    if (staff) {
      // const alreadyClockedOut = staff.clockOuts.find(
      //   (c) =>
      //     c.clockedOutAt.getDate().toString() ===
      //     currentTime.getDate().toString()
      // );

      if (checkClockIn(staff)) {
        res
          .status(400)
          .json({ message: 'You have already Clocked Out For Today' });
      } else {
        const clockOut = {
          clockedOutAt: currentTime,
          staff: req.user._id,
          clockedOut:true,

        };

        staff.clockOuts.push(clockOut);
        await staff.save();
        res.status(201).json({
          _id: staff._id,
          staffId: staff.staffId,
          name: staff.name,
          slug: staff.slug,
          email: staff.email,
          department: staff.department,
          clockIns: staff.clockIns,
          clockOuts: staff.clockOuts,
          isAdmin: staff.isAdmin,
          token: generateToken(staff._id),
        });
      }
    } else {
      res.status(404).json({ message: ' Invalid Staff ID' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error: try again later' });
  }
});