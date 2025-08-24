const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, subject, category, message } = req.body;
  
  // Basic validation
  if (!name || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }
  
  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Valid email is required"
    });
  }
  
  if (!subject || subject.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Subject is required"
    });
  }
  
  if (!category || !["case-tracking", "efiling", "legal-aid", "technical", "general"].includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Valid category is required"
    });
  }
  
  if (!message || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Message is required"
    });
  }
  
  next();
};

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post("/", validateContactForm, async (req, res) => {
  try {
    const { name, email, phone, subject, category, message } = req.body;
    
    // Create new contact entry
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      subject: subject.trim(),
      category,
      message: message.trim()
    });
    
    await contact.save();
    
    // Generate reference number
    const referenceNumber = `CT${contact._id.toString().slice(-8).toUpperCase()}`;
    
    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: {
        referenceNumber,
        submissionId: contact._id,
        estimatedResponseTime: "24-48 hours"
      }
    });
    
    // Log submission for analytics (optional)
    console.log(`📩 New contact submission: ${category} - ${name} (${email})`);
    
  } catch (error) {
    console.error("Contact form error:", error);
    
    // Handle duplicate email (if you want to implement that)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A recent submission with this email already exists"
      });
    }
    
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

// @route   GET /api/contact/:id
// @desc    Get contact form status by ID
// @access  Public
router.get("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id).select('status priority createdAt timeAgo response responseDate');
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found"
      });
    }
    
    res.json({
      success: true,
      data: {
        status: contact.status,
        priority: contact.priority,
        submissionDate: contact.createdAt,
        timeAgo: contact.timeAgo,
        response: contact.response,
        responseDate: contact.responseDate
      }
    });
    
  } catch (error) {
    console.error("Contact status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// @route   GET /api/contact/analytics/summary
// @desc    Get contact form analytics (for admin use)
// @access  Private (would need auth middleware)
router.get("/analytics/summary", async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const inProgress = await Contact.countDocuments({ status: 'in-progress' });
    const resolved = await Contact.countDocuments({ status: 'resolved' });
    
    const categoryBreakdown = await Contact.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name category status createdAt timeAgo');
    
    res.json({
      success: true,
      data: {
        summary: {
          total: totalContacts,
          new: newContacts,
          inProgress: inProgress,
          resolved: resolved
        },
        categoryBreakdown,
        recentContacts
      }
    });
    
  } catch (error) {
    console.error("Contact analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;
