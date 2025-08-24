require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: '10mb' })); // Increased limit for mobile
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mobile-friendly headers
app.use((req, res, next) => {
  // Security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  
  // Mobile compatibility headers
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  
  // Accept mobile user agents
  const userAgent = req.get('User-Agent');
  if (userAgent) {
    req.isMobile = /Mobile|Android|iPhone|iPad|Windows Phone/i.test(userAgent);
  }
  
  next();
});

// CORS configuration - Allow all origins for development
app.use(cors({
  origin: true, // Allow all origins for development
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/files", require("./routes/fileUpload"));

app.get("/", (req, res) => {
  res.send("Auth backend running ✅");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`💻 Local access: http://localhost:${PORT}`);
  console.log('✨ Server ready to accept connections');
});
