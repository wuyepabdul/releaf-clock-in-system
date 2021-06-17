import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/connection.js";
import cors from "cors";

// route import
import staffRoutes from "./routes/staffRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// initialize dotenv config
dotenv.config();

// mongodb connection
connectDB();
// initialize express app
const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// routes
app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Releaf Clock-In System");
});

// setup server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
