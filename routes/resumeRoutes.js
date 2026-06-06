const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

// ----------------------
// ALL ROUTES PROTECTED 🔐
// ----------------------

// CREATE RESUME
router.post("/", protect, createResume);

// GET LOGGED-IN USER RESUMES
router.get("/", protect, getUserResumes);

// GET SINGLE RESUME
router.get("/:id", protect, getResumeById);

// UPDATE RESUME
router.put("/:id", protect, updateResume);

// DELETE RESUME
router.delete("/:id", protect, deleteResume);

module.exports = router;