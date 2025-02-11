import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectionToDB from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import { config } from "dotenv";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use(cors());

// Connect to MongoDB
connectionToDB();

app.use(cookieParser());

// Middleware
app.use(helmet());
app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("pong");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/entries", entryRoutes);

app.use("*", (req, res) => {
  res.status(404).send("OPPS! Page not found!");
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
