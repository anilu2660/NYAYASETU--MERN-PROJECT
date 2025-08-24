const express = require("express");
const router = express.Router();
const Newsletter = require("../models/newsletter");
const crypto = require("crypto");

// Validation middleware
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Valid email address is required"
    });
  }
  
  next();
};

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post("/subscribe", validateEmail, async (req, res) => {
  try {
    const { email, categories, preferences, source } = req.body;
    
    // Get IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Check if email already exists
    let subscription = await Newsletter.findOne({ email: email.toLowerCase() });
    
    if (subscription) {
      // If already subscribed and active
      if (subscription.status === 'active') {
        return res.status(200).json({
          success: true,
          message: "You are already subscribed to our newsletter",
          data: {
            subscriptionDate: subscription.subscriptionDate,
            status: subscription.status,
            isVerified: subscription.isVerified
          }
        });
      }
      
      // If previously unsubscribed, reactivate
      if (subscription.status === 'unsubscribed') {
        subscription.status = 'active';
        subscription.subscriptionDate = new Date();
        subscription.unsubscriptionDate = undefined;
        subscription.ipAddress = ipAddress;
        subscription.userAgent = userAgent;
        
        // Update preferences if provided
        if (categories) subscription.categories = categories;
        if (preferences) subscription.preferences = { ...subscription.preferences, ...preferences };
        if (source) subscription.source = source;
        
        await subscription.save();
        
        return res.status(200).json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated",
          data: {
            subscriptionId: subscription._id,
            reactivationDate: subscription.subscriptionDate
          }
        });
      }
    } else {
      // Create new subscription
      subscription = new Newsletter({
        email: email.toLowerCase(),
        categories: categories || ["all"],
        preferences: preferences || {},
        source: source || "footer",
        ipAddress,
        userAgent
      });
      
      await subscription.save();
    }
    
    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: {
        subscriptionId: subscription._id,
        subscriptionDate: subscription.subscriptionDate,
        verificationToken: subscription.verificationToken,
        message: "A verification email will be sent shortly"
      }
    });
    
    // Log subscription for analytics
    console.log(`📧 New newsletter subscription: ${email} from ${source || 'footer'}`);
    
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0] || "Validation error"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post("/unsubscribe", validateEmail, async (req, res) => {
  try {
    const { email, reason } = req.body;
    
    const subscription = await Newsletter.findOne({ email: email.toLowerCase() });
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Email address not found in our subscription list"
      });
    }
    
    if (subscription.status === 'unsubscribed') {
      return res.status(200).json({
        success: true,
        message: "You are already unsubscribed"
      });
    }
    
    // Update subscription status
    subscription.status = 'unsubscribed';
    subscription.unsubscriptionDate = new Date();
    
    await subscription.save();
    
    res.json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
      data: {
        unsubscriptionDate: subscription.unsubscriptionDate
      }
    });
    
    // Log unsubscription
    console.log(`📧 Newsletter unsubscription: ${email} - Reason: ${reason || 'Not provided'}`);
    
  } catch (error) {
    console.error("Newsletter unsubscription error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
});

// @route   GET /api/newsletter/verify/:token
// @desc    Verify email subscription
// @access  Public
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    
    const subscription = await Newsletter.findOne({ verificationToken: token });
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification token"
      });
    }
    
    if (subscription.isVerified) {
      return res.status(200).json({
        success: true,
        message: "Email is already verified"
      });
    }
    
    // Verify the subscription
    subscription.isVerified = true;
    subscription.verificationDate = new Date();
    subscription.verificationToken = undefined; // Clear the token
    
    await subscription.save();
    
    res.json({
      success: true,
      message: "Email successfully verified! Thank you for subscribing.",
      data: {
        verificationDate: subscription.verificationDate,
        email: subscription.email
      }
    });
    
  } catch (error) {
    console.error("Newsletter verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
});

// @route   GET /api/newsletter/status/:email
// @desc    Get subscription status
// @access  Public
router.get("/status/:email", async (req, res) => {
  try {
    const { email } = req.params;
    
    const subscription = await Newsletter.findOne({ email: email.toLowerCase() })
      .select('email status subscriptionDate isVerified preferences categories daysSinceSubscription');
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Email address not found in our subscription list"
      });
    }
    
    res.json({
      success: true,
      data: {
        email: subscription.email,
        status: subscription.status,
        isVerified: subscription.isVerified,
        subscriptionDate: subscription.subscriptionDate,
        daysSinceSubscription: subscription.daysSinceSubscription,
        preferences: subscription.preferences,
        categories: subscription.categories
      }
    });
    
  } catch (error) {
    console.error("Newsletter status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// @route   GET /api/newsletter/analytics/summary
// @desc    Get newsletter analytics (for admin use)
// @access  Private (would need auth middleware)
router.get("/analytics/summary", async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments();
    const activeSubscribers = await Newsletter.countDocuments({ status: 'active' });
    const verifiedSubscribers = await Newsletter.countDocuments({ isVerified: true });
    const unsubscribed = await Newsletter.countDocuments({ status: 'unsubscribed' });
    
    // Get subscription sources breakdown
    const sourceBreakdown = await Newsletter.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Get recent subscriptions
    const recentSubscriptions = await Newsletter.find({ status: 'active' })
      .sort({ subscriptionDate: -1 })
      .limit(10)
      .select('email subscriptionDate source isVerified');
    
    // Get subscription growth (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentGrowth = await Newsletter.countDocuments({
      subscriptionDate: { $gte: thirtyDaysAgo }
    });
    
    res.json({
      success: true,
      data: {
        summary: {
          total: totalSubscribers,
          active: activeSubscribers,
          verified: verifiedSubscribers,
          unsubscribed: unsubscribed,
          verificationRate: totalSubscribers > 0 ? ((verifiedSubscribers / totalSubscribers) * 100).toFixed(2) : 0
        },
        growth: {
          last30Days: recentGrowth
        },
        sourceBreakdown,
        recentSubscriptions
      }
    });
    
  } catch (error) {
    console.error("Newsletter analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;
