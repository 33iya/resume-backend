const Resume = require("../models/resume");

// =======================
// CREATE RESUME (LOGIN USER ONLY)
// =======================
const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      userId: req.user._id, // 🔐 important fix
    });

    res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET ALL RESUMES (LOGGED IN USER)
// =======================
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user._id, // 🔐 secure fix
    });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET SINGLE RESUME (OWNER ONLY)
// =======================
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id, // 🔐 security
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// UPDATE RESUME (OWNER ONLY)
// =======================
const updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id, // 🔐 security
      },
      req.body,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({
      message: "Resume updated successfully",
      updatedResume,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE RESUME (OWNER ONLY)
// =======================
const deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id, // 🔐 security
    });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};