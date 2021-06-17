import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded) {
        req.user = await Staff.findById(decoded.id);
      } else {
        res.status(400).json({ message: "Invalid token" });
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: "Token has Expired" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Access Denied: No token" });
  }
};

// admin check middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Access Denied: Not authorized as an Admin" });
  }
};
