import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db";
import routes from "./routes";
import morgan from "morgan";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:8081", // Frontend URL
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Connect to db
db();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
