import express, { Application } from "express";
import mongoose from "mongoose";
const cors = require("cors");
import dotenv from "dotenv";
const db = require("./config/db");
import routes from "./routes";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration

// Routes
app.use("/api", routes);

// Connect to db
db.connect();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
