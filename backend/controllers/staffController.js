import asyncHandler from "express-async-handler";
import Staff from "../models/staffModel.js";
import generateRandomNumber from "../utils/generateRandomNumber.js";
import generateToken from "../utils/generateToken.js";

// @desc Get all staff
// @route GET /api/staff/list
// @access Protected
export const getAllStaffController = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ message: "No staff found" });
    }
  } catch (error) {
    // handle error
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Get staff profile
export const getStaffProfileController = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id);
    if (staff) {
      res.json({
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        department: staff.department,
        isAdmin: staff.isAdmin,
      });
    } else {
      res.status(404).json({ message: "Staff not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error, try again later" });
  }
});

// @desc update staff profile
// @route PUT /api/staffs/profile
// @access Private
export const updateStaffProfileController = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id);

    //check if staff exist
    if (staff) {
      staff.name = req.body.name || staff.name;
      staff.staffId = generateRandomNumber(req.body.name) || staff.staffId;
      staff.email = req.body.email || staff.email;
      staff.department = req.body.department || staff.department;

      //  save updated staff details
      const updatedStaff = await staff.save();

      //send back updated staff details
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
      res.status(404).json({ message: "Staff not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error, try again later" });
  }
});

// clockin a staff
export const clockInStaff = asyncHandler(async (req, res) => {
  try {
    const { staffId } = req.body;
    const currentTime = new Date();

    //find and check if staff exist
    const staff = await Staff.findOne({ staffId });
    if (staff) {
      const alreadyClockedIn = staff.clockIns.find(
        (c) =>
          c.clockedInAt.getDate().toString() ===
          currentTime.getDate().toString()
      );

      //check if already clocked in
      if (alreadyClockedIn) {
        res
          .status(400)
          .json({ message: "You have already Clocked In For Today" });
      } else {
        const clockIn = {
          clockedInAt: currentTime,
          staff: req.user._id,
        };

        // push clockIn to list of clockIns
        staff.clockIns.push(clockIn);

        //save updated staff info
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
      res.status(404).json({ message: " Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// clockout a staff
export const clockOutStaff = asyncHandler(async (req, res) => {
  try {
    const { staffId } = req.body;
    const currentTime = new Date();

    //find and check if staff exist
    const staff = await Staff.findOne({ staffId });
    if (staff) {
      const alreadyClockedOut = staff.clockOuts.find(
        (c) =>
          c.clockedOutAt.getDate().toString() ===
          currentTime.getDate().toString()
      );

      //check if already clocked in
      if (alreadyClockedOut) {
        res
          .status(400)
          .json({ message: "You have already Clocked Out For Today" });
      } else {
        const clockOut = {
          clockedOutAt: currentTime,
          staff: req.user._id,
        };

        // push clockout to list of clockouts
        staff.clockOuts.push(clockOut);

        //save updated staff info
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
      res.status(404).json({ message: " Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error: try again later" });
  }
});
