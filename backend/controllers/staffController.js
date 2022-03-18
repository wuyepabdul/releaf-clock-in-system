const asyncHandler = require('express-async-handler');
const { checkClockIn } = require('../helpers/checkClockin.js');
const Staff = require('../models/staffModel.js');
const generateStaffId = require('../utils/generateStaffId.js');
const generateToken = require('../utils/generateToken.js');

module.exports.getAllStaffController = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ message: 'No staff found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error, try again later' });
  }
});

module.exports.getStaffProfileController = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id);

    if (staff) {
      res.json({
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        staffId: staff.staffId,
        department: staff.department,
        isAdmin: staff.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    console.log('error', error.message);
    res.status(500).json({ message: 'Server Error, try again later' });
  }
});

module.exports.updateStaffProfileController = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id);

    if (staff) {
      staff.name = req.body.name || staff.name;
      staff.staffId =
        generateStaffId(req.body.name.split(' ')[0]) || staff.staffId;
      staff.email = req.body.email || staff.email;
      staff.department = req.body.department || staff.department;

      const updatedStaff = await staff.save();
      res.status(201).json({
        _id: updatedStaff._id,
        staffId: updatedStaff.staffId,
        name: updatedStaff.name,
        slug: updatedStaff.slug,
        email: updatedStaff.email,
        department: updatedStaff.department,
        clockIns: updatedStaff.clockIns,
        clockOuts: updatedStaff.clockOuts,
        isAdmin: updatedStaff.isAdmin,
        token: generateToken(updatedStaff._id),
      });
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server Error, try again later' });
  }
});

module.exports.clockInStaff = asyncHandler(async (req, res) => {
  try {
    const { staffId } = req.body;
    const currentTime = new Date();
    const staff = await Staff.findOne({ staffId });

    if (staff) {
      // const alreadyClockedIn = staff.clockIns.find(
      //   (c) =>
      //     c.clockedInAt.getDate().toString() ===
      //     currentTime.getDate().toString()
      // );

      if (checkClockIn(staff)) {
        res
          .status(400)
          .json({ message: 'You have already Clocked In For Today' });
      } else {
        const clockIn = {
          clockedInAt: currentTime,
          staff: req.user._id,
          clockedIn:true,
        };

        staff.clockIns.push(clockIn);
        await staff.save();

        res.status(201).json({
          _id: staff._id,
          staffId: staff.staffId,
          name: staff.name,
          slug: staff.slug,
          email: staff.email,
          department: staff.department,
          clockIns: staff.clockIns,
          clockIns: staff.clockIns,
          isAdmin: staff.isAdmin,
          token: generateToken(staff._id),
        });
      }
    } else {
      console.log('staff does not exist');
      res.status(404).json({ message: ' Invalid Staff ID' });
    }
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
