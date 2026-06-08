const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// REGISTER USER
// =======================
const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Checking if DB is connected or user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("🟢 User successfully registered in DB:", user.email);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// =======================
// LOGIN USER
// =======================
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    console.log("🔍 Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ USER NOT FOUND IN DATABASE:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("🔹 User found in DB. Comparing passwords...");
    
    // Debugging bcrypt comparison
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ PASSWORD DID NOT MATCH FOR:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ⭐ FIX: .env check ko warning bana diya taaki response block na ho
    const secretKey = process.env.JWT_SECRET || "resume_ai_app_secret_12345";
    
    if (!process.env.JWT_SECRET) {
      console.warn("⚠️ Warning: JWT_SECRET .env se nahi mila, backup secret key use ho rahi hai.");
    }

    const token = jwt.sign(
      { id: user._id },
      secretKey, // ✅ Ab yahan hamesha solid value milegi!
      { expiresIn: "7d" }
    );

    console.log("🚀 Login successful for:", email);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };