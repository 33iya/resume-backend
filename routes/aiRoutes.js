const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { generateResume } = require("../controllers/aiController");

// AI GENERATE
router.post("/generate", protect, generateResume);

module.exports = router;