import asyncHandler from "express-async-handler";
import Staff from "../models/staffModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import slugify from "slugify";
import generateRandomNumber from "../utils/generateRandomNumber.js";

// @desc Auth staff and get token
export const authStaffController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });

    if (!staff) {
      res.status(401).json({ message: "Invalid Email or Password" });
      return;
    } else {
      const matchedPassword = await bcrypt.compare(password, staff.password);
      if (!matchedPassword) {
        res.status(401).json({ message: "Invalid Email or Password" });
        return;
      }
      res.json({
        _id: staff._id,
        staffId: staff.staffId,
        name: staff.name,
        email: staff.email,
        department: staff.department,
        clockIns: staff.clockIns,
        clockOuts: staff.clockOuts,
        isAdmin: staff.isAdmin,
        token: generateToken(staff._id),
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// @desc Register new staff
export const registerStaffController = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const emailExist = await Staff.findOne({ email });

    // check if staff is already registered
    if (emailExist) {
      res.status(400).json({ message: "staff already exist" });
      return;
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create and save new Staff
    const staff = new Staff({
      staffId: generateRandomNumber(name.split(" ")[0]),
      name,
      slug: slugify(name),
      email,
      password: hashedPassword,
      department,
    });
    const savedstaff = await staff.save();

    if (savedstaff) {
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
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid staff Data" });
  }
});
