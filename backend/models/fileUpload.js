const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true
    },
    originalName: {
      type: String,
      required: [true, "Original filename is required"],
      trim: true
    },
    mimetype: {
      type: String,
      required: [true, "File type is required"]
    },
    size: {
      type: Number,
      required: [true, "File size is required"],
      max: [10485760, "File size cannot exceed 10MB"] // 10MB in bytes
    },
    fileType: {
      type: String,
      enum: ["document", "image", "pdf", "other"],
      default: "document"
    },
    category: {
      type: String,
      enum: ["petition", "affidavit", "evidence", "citation", "identity", "certificate", "other"],
      required: [true, "File category is required"]
    },
    filingType: {
      type: String,
      enum: ["petition", "appeal", "application", "complaint", "bail", "revision"],
      required: [true, "Filing type is required"]
    },
    courtLevel: {
      type: String,
      enum: ["supreme", "high", "district", "subordinate"],
      required: [true, "Court level is required"]
    },
    filePath: {
      type: String,
      required: [true, "File path is required"]
    },
    cloudUrl: {
      type: String // For cloud storage URLs
    },
    checksum: {
      type: String // For file integrity verification
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "verified", "rejected", "archived"],
      default: "uploaded"
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be longer than 500 characters"]
    },
    tags: [{
      type: String,
      trim: true
    }],
    scanResults: {
      isVirusFree: {
        type: Boolean,
        default: null
      },
      scanDate: {
        type: Date
      },
      scanEngine: {
        type: String
      }
    },
    metadata: {
      pageCount: Number,
      wordCount: Number,
      language: String,
      hasText: Boolean,
      isEncrypted: Boolean,
      documentVersion: String
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date
    },
    expiryDate: {
      type: Date
    },
    retention: {
      type: String,
      enum: ["permanent", "temporary", "archive"],
      default: "permanent"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
fileUploadSchema.index({ userId: 1, createdAt: -1 });
fileUploadSchema.index({ filingType: 1, courtLevel: 1 });
fileUploadSchema.index({ status: 1, createdAt: -1 });
fileUploadSchema.index({ category: 1 });
fileUploadSchema.index({ filename: 1 });

// Virtual for file size in readable format
fileUploadSchema.virtual('readableSize').get(function() {
  const bytes = this.size;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Virtual for file extension
fileUploadSchema.virtual('extension').get(function() {
  return this.originalName.split('.').pop().toLowerCase();
});

// Virtual for days since upload
fileUploadSchema.virtual('daysSinceUpload').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to set file type based on mimetype
fileUploadSchema.pre('save', function(next) {
  if (this.isModified('mimetype')) {
    if (this.mimetype.startsWith('image/')) {
      this.fileType = 'image';
    } else if (this.mimetype === 'application/pdf') {
      this.fileType = 'pdf';
    } else if (this.mimetype.includes('document') || this.mimetype.includes('text')) {
      this.fileType = 'document';
    } else {
      this.fileType = 'other';
    }
  }
  next();
});

module.exports = mongoose.model("FileUpload", fileUploadSchema);
