// src/index.ts
import dotenv from "dotenv";
dotenv.config(); // This must be the first line to load .env variables

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. Middleware ---
app.use(express.json());

// --- 2. Database Connection ---
const mongoUri = process.env.MONGO_URI as string;

if (!mongoUri) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch((err) => console.error("Connection error", err));

// --- 3. Basic Routes ---
app.get("/", (req: Request, res: Response) => {
  res.send("LMS Backend is up and running!");
});

// --- 3.1. Auth Routes ---
app.use("/api/auth", authRoutes);
// --- 3.2. Course Routes ---
app.use("/api/courses", courseRoutes);

// --- 4. Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
