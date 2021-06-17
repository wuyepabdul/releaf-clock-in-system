import express from "express";
import {
  deleteStaff,
  getSingleStaff,
  listAllStaff,
  updateStaff,
} from "../controllers/staffController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//list a staff route
router.get("/", listAllStaff);

//get staff by slug route
router.get("/:slug", getSingleStaff);

//update a staff route
router.put("/:slug", protect, updateStaff);

// delete a staff route
router.delete("/:slug", protect, isAdmin, deleteStaff);

export default router;
