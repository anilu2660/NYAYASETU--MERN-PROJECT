const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    status: {
      type: String,
      enum: ["active", "inactive", "unsubscribed"],
      default: "active"
    },
    subscriptionDate: {
      type: Date,
      default: Date.now
    },
    unsubscriptionDate: {
      type: Date
    },
    categories: [{
      type: String,
      enum: ["legal-updates", "case-notifications", "general-news", "system-updates", "all"],
      default: ["all"]
    }],
    preferences: {
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "weekly"
      },
      language: {
        type: String,
        enum: ["english", "hindi"],
        default: "english"
      },
      format: {
        type: String,
        enum: ["html", "text"],
        default: "html"
      }
    },
    source: {
      type: String,
      enum: ["footer", "contact-page", "signup", "homepage", "other"],
      default: "footer"
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    verificationToken: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationDate: {
      type: Date
    },
    lastEmailSent: {
      type: Date
    },
    emailsSent: {
      type: Number,
      default: 0
    },
    clickThrough: {
      type: Number,
      default: 0
    },
    bounceCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
newsletterSchema.index({ email: 1 }, { unique: true });
newsletterSchema.index({ status: 1, createdAt: -1 });
newsletterSchema.index({ subscriptionDate: -1 });
newsletterSchema.index({ isVerified: 1 });

// Virtual for days since subscription
newsletterSchema.virtual('daysSinceSubscription').get(function() {
  const now = new Date();
  const diff = now - this.subscriptionDate;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to generate verification token
newsletterSchema.pre('save', function(next) {
  if (this.isNew && !this.verificationToken) {
    this.verificationToken = require('crypto').randomBytes(32).toString('hex');
  }
  next();
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
