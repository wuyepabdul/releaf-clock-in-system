import asyncHandler from "express-async-handler";
import slugify from "slugify";
import bcrypt from "bcryptjs";
import Staff from "../models/staffModel.js";
import generateRandomNumber from "../utils/generateRandomNo.js";
import generateToken from "../utils/generateToken.js";

// @desc authenticate staff
export const authenticateStaff = asyncHandler(async (req, res) => {
  try {
    const staff = await Staff.findOne({ staffId: req.body.staffId });
    const matchedPassword = await bcrypt.compare(
      req.body.password,
      staff.password
    );

    // check if user exist and staffId / password matched
    if (staff && matchedPassword) {
      res.json({
        _id: staff._id,
        staffId: staff.staffId,
        name: staff.name,
        email: staff.email,
        age: staff.age,
        department: staff.department,
        maritalStatus: staff.maritalStatus,
        isAdmin: staff.isAdmin,
        token: generateToken(staff._id),
      });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

// @desc Create a Staff controller
export const createStaff = asyncHandler(async (req, res) => {
  const { name, email, password, age, department, maritalStatus } = req.body;

  try {
    //check if staff exist
    const slugExist = await Staff.findOne({ slug: slugify(name) });
    const emailExist = await Staff.findOne({ email });

    if (slugExist || emailExist) {
      res.status(400).json({ message: "Staff already exist" });
      return;
    }
    // create new staff
    const hashedPassword = bcrypt.hashSync(password, 10);
    const staff = await new Staff({
      staffId: generateRandomNumber(name),
      name,
      slug: slugify(name),
      email,
      password: hashedPassword,
      age,
      department,
      maritalStatus,
    }).save();
    // send back json
    res.json({
      _id: staff._id,
      staffId: staff.staffId,
      name: staff.name,
      email: staff.email,
      age: staff.age,
      department: staff.department,
      maritalStatus: staff.maritalStatus,
      isAdmin: staff.isAdmin,
      token: generateToken(staff._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
