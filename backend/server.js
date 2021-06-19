import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/connection.js";

// routes import
import authRoute from "./routes/authRoute.js";
import staffRoutes from "./routes/staffRoutes.js";

// initalise environment variables
dotenv.config();

const app = express();

// mongodb connection
dbConnection();

/* ***************************************************MIDDLEWARES************************************* */

// parse requests of content-type - application/json
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoutes);

/* **************************************************SERVER CONNECTION********************************* */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
