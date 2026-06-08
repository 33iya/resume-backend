require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

// ----------------------
// MIDDLEWARES
// ----------------------
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

// ----------------------
// TEST ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("🚀 Resume AI API Running Successfully...");
});

// ----------------------
// ROUTES
// ----------------------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// ----------------------
// START SERVER AFTER DB CONNECT
// ----------------------
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
  });