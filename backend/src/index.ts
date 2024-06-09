import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db";
// const db = require("./config/db");
import routes from "./routes";
import { authMiddleware } from "./middleware/authMiddleware";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(authMiddleware);

// Database configuration

// Routes
app.use("/api", routes);

// Connect to db
db();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
