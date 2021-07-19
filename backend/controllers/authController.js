const asyncHandler = require("express-async-handler");
const Staff = require("../models/staffModel.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const slugify = require("slugify");
const generateStaffId = require("../utils/generateStaffId");

module.exports.authStaffController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });

    if (!staff) {
      res.status(401).json({ message: "Invalid Email or Password" });
      console.log("staff not found");
      return;
    } else {
      const matchedPassword = await bcrypt.compare(password, staff.password);
      if (!matchedPassword) {
        res.status(401).json({ message: "Invalid Email or Password" });
        console.log("password not matched");
        return;
      }
      res.status(200).json({
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

module.exports.registerStaffController = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const emailExist = await Staff.findOne({ email });

    if (emailExist) {
      res.status(400).json({ message: "staff already exist" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const staff = new Staff({
      staffId: generateStaffId(name.split(" ")[0]),
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
