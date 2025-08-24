const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const router = express.Router();
const FileUpload = require("../models/fileUpload");

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
    cb(null, filename);
  }
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'text/plain'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, JPEG, PNG, and TXT files are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files
  },
  fileFilter: fileFilter
});

// Validation middleware
const validateUploadData = (req, res, next) => {
  const { filingType, courtLevel, category } = req.body;
  
  const validFilingTypes = ["petition", "appeal", "application", "complaint", "bail", "revision"];
  const validCourtLevels = ["supreme", "high", "district", "subordinate"];
  const validCategories = ["petition", "affidavit", "evidence", "citation", "identity", "certificate", "other"];
  
  if (!filingType || !validFilingTypes.includes(filingType)) {
    return res.status(400).json({
      success: false,
      message: "Valid filing type is required"
    });
  }
  
  if (!courtLevel || !validCourtLevels.includes(courtLevel)) {
    return res.status(400).json({
      success: false,
      message: "Valid court level is required"
    });
  }
  
  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Valid file category is required"
    });
  }
  
  next();
};

// Generate file checksum for integrity verification
const generateChecksum = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
};

// @route   POST /api/files/upload
// @desc    Upload files for eFiling
// @access  Public (would typically require auth)
router.post("/upload", upload.array('files', 10), validateUploadData, async (req, res) => {
  try {
    const { filingType, courtLevel, category, description, tags } = req.body;
    const files = req.files;
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one file is required"
      });
    }
    
    const uploadedFiles = [];
    const errors = [];
    
    // Process each uploaded file
    for (const file of files) {
      try {
        // Generate checksum
        const checksum = await generateChecksum(file.path);
        
        // Create file upload record
        const fileUpload = new FileUpload({
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          category,
          filingType,
          courtLevel,
          filePath: file.path,
          checksum,
          description: description || '',
          tags: tags ? tags.split(',').map(tag => tag.trim()) : []
        });
        
        await fileUpload.save();
        
        uploadedFiles.push({
          id: fileUpload._id,
          filename: fileUpload.filename,
          originalName: fileUpload.originalName,
          size: fileUpload.readableSize,
          type: fileUpload.fileType,
          status: fileUpload.status,
          uploadDate: fileUpload.createdAt
        });
        
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error);
        errors.push({
          filename: file.originalname,
          error: error.message
        });
        
        // Clean up the file if database save failed
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }
    
    // Generate filing reference number
    const filingReference = `FL${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      data: {
        filingReference,
        uploadedFiles,
        errors: errors.length > 0 ? errors : undefined,
        summary: {
          totalFiles: files.length,
          successful: uploadedFiles.length,
          failed: errors.length
        }
      }
    });
    
    // Log upload for analytics
    console.log(`📁 File upload: ${uploadedFiles.length} files for ${filingType} at ${courtLevel} level`);
    
  } catch (error) {
    console.error("File upload error:", error);
    
    // Clean up uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    // Handle multer errors
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: "File size too large. Maximum size is 10MB per file."
        });
      }
      if (error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: "Too many files. Maximum 10 files allowed."
        });
      }
    }
    
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error during file upload. Please try again."
    });
  }
});

// @route   GET /api/files/:id
// @desc    Get file details by ID
// @access  Public (would typically require auth)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const file = await FileUpload.findById(id).select('-filePath -checksum');
    
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }
    
    res.json({
      success: true,
      data: {
        id: file._id,
        filename: file.filename,
        originalName: file.originalName,
        size: file.readableSize,
        type: file.fileType,
        category: file.category,
        filingType: file.filingType,
        courtLevel: file.courtLevel,
        status: file.status,
        description: file.description,
        tags: file.tags,
        uploadDate: file.createdAt,
        daysSinceUpload: file.daysSinceUpload
      }
    });
    
  } catch (error) {
    console.error("Get file error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// @route   GET /api/files/download/:id
// @desc    Download file by ID
// @access  Public (would typically require auth)
router.get("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const file = await FileUpload.findById(id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }
    
    if (!fs.existsSync(file.filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found on server"
      });
    }
    
    // Update download count and last accessed
    file.downloadCount += 1;
    file.lastAccessed = new Date();
    await file.save();
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Type', file.mimetype);
    
    // Stream the file
    const fileStream = fs.createReadStream(file.filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error("File download error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during file download"
    });
  }
});

// @route   DELETE /api/files/:id
// @desc    Delete file by ID
// @access  Private (would require auth and ownership check)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const file = await FileUpload.findById(id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }
    
    // Delete file from filesystem
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }
    
    // Delete from database
    await FileUpload.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: "File deleted successfully"
    });
    
  } catch (error) {
    console.error("File deletion error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during file deletion"
    });
  }
});

// @route   GET /api/files/analytics/summary
// @desc    Get file upload analytics (for admin use)
// @access  Private (would need auth middleware)
router.get("/analytics/summary", async (req, res) => {
  try {
    const totalFiles = await FileUpload.countDocuments();
    const totalSize = await FileUpload.aggregate([
      { $group: { _id: null, totalSize: { $sum: "$size" } } }
    ]);
    
    const statusBreakdown = await FileUpload.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const typeBreakdown = await FileUpload.aggregate([
      {
        $group: {
          _id: '$fileType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const categoryBreakdown = await FileUpload.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const recentUploads = await FileUpload.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('originalName fileType size status createdAt daysSinceUpload');
    
    res.json({
      success: true,
      data: {
        summary: {
          totalFiles,
          totalSize: totalSize[0]?.totalSize || 0,
          avgFileSize: totalFiles > 0 ? Math.round((totalSize[0]?.totalSize || 0) / totalFiles) : 0
        },
        breakdowns: {
          status: statusBreakdown,
          type: typeBreakdown,
          category: categoryBreakdown
        },
        recentUploads
      }
    });
    
  } catch (error) {
    console.error("File analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;
