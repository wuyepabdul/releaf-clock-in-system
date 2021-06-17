import Staff from "../models/staffModel.js";

import asyncHandler from "express-async-handler";
// @desc List all staff controller
export const listAllStaff = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Staff.countDocuments({ ...keyword });
    const staff = await Staff.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (staff) {
      res.json({ staff, page, pages: Math.ceil(count / pageSize) });
    } else {
      res.status(404).json({ message: "No Staff found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error: try again later" });
  }
};

// @desc get a single staff controller
export const getSingleStaff = async (req, res) => {
  try {
    const staff = await Staff.findOne({ slug: req.params.slug });

    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ message: "Staff not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
};

// @desc delete a staff controller
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findOne({ slug: req.params.slug });

    if (staff) {
      await staff.remove();
      res.json({ message: `Staff {${staff.name}} deleted ` });
    } else {
      res.status(404);
      throw new Error("Staff not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
};

// @desc Update a Staff
export const updateStaff = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const staff = await Staff.findOne({ slug: req.params.slug });
    if (staff) {
      staff.name = name;

      const updatedStaff = await staff.save();
      res.status(201).json(updatedStaff);
    } else {
      res.status(404).json({ message: "Staff Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});
