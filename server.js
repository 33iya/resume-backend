require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

// ----------------------
// MIDDLEWARES
// ----------------------
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ----------------------
// DB CONNECT
// ----------------------
connectDB();

// ----------------------
// TEST ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("🚀 Resume AI API Running Successfully...");
});

// ----------------------
// ROUTES (ONLY ESSENTIAL FOR NOW)
// ----------------------

// USER ROUTES
app.use("/api/user", require("./routes/userRoutes"));

// RESUME ROUTES
app.use("/api/resume", require("./routes/resumeRoutes"));

// AI ROUTE (KEEP ONLY IF READY)
app.use("/api/ai", require("./routes/aiRoutes"));

// ----------------------
// 404 HANDLER
// ----------------------
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ----------------------
// GLOBAL ERROR HANDLER
// ----------------------
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    message: "Server Error",
  });
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});