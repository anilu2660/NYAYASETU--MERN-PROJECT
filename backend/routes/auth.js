const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Enhanced validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "All fields are required", 
        code: "MISSING_FIELDS",
        isMobile: req.isMobile 
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters long", 
        code: "WEAK_PASSWORD",
        isMobile: req.isMobile 
      });
    }
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        message: "Email already in use", 
        code: "EMAIL_EXISTS",
        isMobile: req.isMobile 
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    res.status(201).json({ 
      success: true,
      user: { id: user._id, name: user.name, email: user.email }, 
      token,
      isMobile: req.isMobile
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ 
      message: "Server error during signup", 
      code: "SERVER_ERROR",
      isMobile: req.isMobile 
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Enhanced validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required", 
        code: "MISSING_CREDENTIALS",
        isMobile: req.isMobile 
      });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: "Invalid email or password", 
        code: "INVALID_CREDENTIALS",
        isMobile: req.isMobile 
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Invalid email or password", 
        code: "INVALID_CREDENTIALS",
        isMobile: req.isMobile 
      });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token,
      isMobile: req.isMobile
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: "Server error during login", 
      code: "SERVER_ERROR",
      isMobile: req.isMobile 
    });
  }
});

const auth = require("../middleware/auth");

// Example protected route
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
//reset Password


module.exports = router;
