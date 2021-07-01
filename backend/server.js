import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/connection.js";

import authRoute from "./routes/authRoute.js";
import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();

const app = express();

dbConnection();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
