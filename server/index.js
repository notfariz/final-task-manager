// index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",          // Vite dev
  process.env.FRONTEND_URL,         // e.g. https://your-app.vercel.app (set later)
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    return allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const auth = require("./middleware/authMiddleware");

// Task route
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", auth, taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

// ✅ Health check
app.get("/healthz", (req, res) => {
  res.status(200).send("ok");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // fail fast if cannot reach cluster
    socketTimeoutMS: 45000,         // keep sockets healthy
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
