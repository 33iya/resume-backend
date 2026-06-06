const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "My Resume",
    },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      linkedin: String,
      github: String,
      summary: String,
    },

    education: [
      {
        institute: String,
        degree: String,
        field: String,
        startYear: String,
        endYear: String,
        description: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    skills: [
      {
        name: String,
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced"],
        },
      },
    ],

    projects: [
      {
        name: String,
        description: String,
        link: String,
      },
    ],

    certifications: [
      {
        name: String,
        issuer: String,
        year: String,
      },
    ],

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);