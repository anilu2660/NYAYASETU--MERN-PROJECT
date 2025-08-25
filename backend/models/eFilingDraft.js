const mongoose = require("mongoose");

const eFilingDraftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    draftId: {
      type: String,
      unique: true,
      required: true
    },
    courtLevel: {
      type: String,
      enum: ["supreme", "high", "district", "subordinate"],
      required: true
    },
    filingType: {
      type: String,
      enum: ["petition", "appeal", "application", "complaint", "bail", "revision"],
      required: true
    },
    petitionerName: {
      type: String,
      required: true,
      trim: true
    },
    respondentName: {
      type: String,
      required: true,
      trim: true
    },
    caseSubject: {
      type: String,
      required: true,
      trim: true
    },
    advocateName: {
      type: String,
      required: true,
      trim: true
    },
    enrollmentNumber: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    uploadedFiles: [{
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileUpload"
      },
      fileName: String,
      originalName: String,
      fileSize: Number,
      uploadDate: Date
    }],
    estimatedFee: {
      type: Number,
      default: 0
    },
    serviceCharge: {
      type: Number,
      default: 50
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "paid", "processed"],
      default: "draft"
    },
    lastModified: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
eFilingDraftSchema.index({ userId: 1, createdAt: -1 });
// draftId index is automatically created due to unique: true
eFilingDraftSchema.index({ status: 1, createdAt: -1 });
eFilingDraftSchema.index({ courtLevel: 1, filingType: 1 });

// Virtual for days since last modified
eFilingDraftSchema.virtual('daysSinceModified').get(function() {
  const now = new Date();
  const diff = now - this.lastModified;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to update lastModified and calculate total amount
eFilingDraftSchema.pre('save', function(next) {
  this.lastModified = new Date();
  this.totalAmount = this.estimatedFee + this.serviceCharge;
  next();
});

// Generate unique draft ID
eFilingDraftSchema.statics.generateDraftId = function() {
  return `DRAFT${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
};

module.exports = mongoose.model("EFilingDraft", eFilingDraftSchema);
