const mongoose = require("mongoose");

async function connectDB() {
  try {
    const options = {
      // SSL/TLS options to fix connection issues
      ssl: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      // Connection timeout options
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000 // 45 seconds
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    
    // If it's a certificate/SSL error, try with different SSL settings
    if (err.message.includes('SSL') || err.message.includes('TLS') || err.message.includes('certificate')) {
      console.log("🔄 Retrying with alternative SSL configuration...");
      try {
        const fallbackOptions = {
          ssl: true,
          tlsInsecure: true, // Only for development - allows invalid certificates
          serverSelectionTimeoutMS: 30000,
          socketTimeoutMS: 45000
        };
        
        await mongoose.connect(process.env.MONGO_URI, fallbackOptions);
        console.log("✅ MongoDB connected with fallback SSL configuration");
        console.log("⚠️  Warning: Using insecure SSL configuration. Consider updating your certificates.");
      } catch (fallbackErr) {
        console.error("❌ Fallback connection also failed:", fallbackErr.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
}

module.exports = connectDB;
