import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/connection.js";
import path from "path";
import authRoute from "./routes/authRoute.js";
import staffRoutes from "./routes/staffRoutes.js";
import morgan from "morgan";

dotenv.config();

const app = express();

dbConnection();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoute);
app.use("/api/staff", staffRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
