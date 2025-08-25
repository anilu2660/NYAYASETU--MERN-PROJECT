const express = require("express");
const router = express.Router();
const EFilingDraft = require("../models/eFilingDraft");
const FileUpload = require("../models/fileUpload");

// Fee calculation helper
const calculateFee = (courtLevel, filingType) => {
  const fees = {
    supreme: { petition: 5000, appeal: 3000, application: 1000 },
    high: { petition: 2000, appeal: 1500, application: 500 },
    district: { petition: 500, appeal: 300, application: 200 },
    subordinate: { petition: 200, appeal: 150, application: 100 }
  };
  
  if (fees[courtLevel] && fees[courtLevel][filingType]) {
    return fees[courtLevel][filingType];
  }
  return 0;
};

// @route   POST /api/efiling/save-draft
// @desc    Save eFiling form as draft
// @access  Public (would typically require auth)
router.post("/save-draft", async (req, res) => {
  try {
    const {
      courtLevel,
      filingType,
      petitionerName,
      respondentName,
      caseSubject,
      advocateName,
      enrollmentNumber,
      email,
      phone,
      uploadedFiles,
      notes,
      draftId // Optional - for updating existing draft
    } = req.body;

    // Validate required fields
    if (!courtLevel || !filingType || !petitionerName || !respondentName || 
        !caseSubject || !advocateName || !enrollmentNumber) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const estimatedFee = calculateFee(courtLevel, filingType);
    const serviceCharge = 50;

    let draft;

    if (draftId) {
      // Update existing draft
      draft = await EFilingDraft.findOne({ draftId });
      if (!draft) {
        return res.status(404).json({
          success: false,
          message: "Draft not found"
        });
      }

      // Update draft fields
      Object.assign(draft, {
        courtLevel,
        filingType,
        petitionerName,
        respondentName,
        caseSubject,
        advocateName,
        enrollmentNumber,
        email,
        phone,
        uploadedFiles: uploadedFiles || [],
        estimatedFee,
        serviceCharge,
        notes
      });

    } else {
      // Create new draft
      const newDraftId = EFilingDraft.generateDraftId();
      
      draft = new EFilingDraft({
        draftId: newDraftId,
        courtLevel,
        filingType,
        petitionerName,
        respondentName,
        caseSubject,
        advocateName,
        enrollmentNumber,
        email,
        phone,
        uploadedFiles: uploadedFiles || [],
        estimatedFee,
        serviceCharge,
        notes
      });
    }

    await draft.save();

    res.status(201).json({
      success: true,
      message: draftId ? "Draft updated successfully" : "Draft saved successfully",
      data: {
        draftId: draft.draftId,
        courtLevel: draft.courtLevel,
        filingType: draft.filingType,
        petitionerName: draft.petitionerName,
        respondentName: draft.respondentName,
        caseSubject: draft.caseSubject,
        advocateName: draft.advocateName,
        enrollmentNumber: draft.enrollmentNumber,
        email: draft.email,
        phone: draft.phone,
        uploadedFiles: draft.uploadedFiles,
        estimatedFee: draft.estimatedFee,
        serviceCharge: draft.serviceCharge,
        totalAmount: draft.totalAmount,
        status: draft.status,
        lastModified: draft.lastModified,
        createdAt: draft.createdAt
      }
    });

  } catch (error) {
    console.error("Save draft error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving draft"
    });
  }
});

// @route   GET /api/efiling/drafts
// @desc    Get all drafts for a user
// @access  Public (would typically require auth)
router.get("/drafts", async (req, res) => {
  try {
    const { userId, limit = 10, page = 1 } = req.query;
    
    const query = userId ? { userId } : {};
    const skip = (page - 1) * limit;

    const drafts = await EFilingDraft.find(query)
      .sort({ lastModified: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await EFilingDraft.countDocuments(query);

    res.json({
      success: true,
      data: {
        drafts: drafts.map(draft => ({
          draftId: draft.draftId,
          courtLevel: draft.courtLevel,
          filingType: draft.filingType,
          petitionerName: draft.petitionerName,
          caseSubject: draft.caseSubject,
          status: draft.status,
          totalAmount: draft.totalAmount,
          uploadedFiles: draft.uploadedFiles.length,
          lastModified: draft.lastModified,
          daysSinceModified: draft.daysSinceModified,
          createdAt: draft.createdAt
        })),
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: drafts.length,
          totalRecords: total
        }
      }
    });

  } catch (error) {
    console.error("Get drafts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching drafts"
    });
  }
});

// @route   GET /api/efiling/draft/:draftId
// @desc    Get specific draft by ID
// @access  Public (would typically require auth)
router.get("/draft/:draftId", async (req, res) => {
  try {
    const { draftId } = req.params;

    const draft = await EFilingDraft.findOne({ draftId })
      .populate('uploadedFiles.fileId', 'filename originalName size fileType status')
      .select('-__v');

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Draft not found"
      });
    }

    res.json({
      success: true,
      data: draft
    });

  } catch (error) {
    console.error("Get draft error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching draft"
    });
  }
});

// @route   DELETE /api/efiling/draft/:draftId
// @desc    Delete a draft
// @access  Public (would typically require auth)
router.delete("/draft/:draftId", async (req, res) => {
  try {
    const { draftId } = req.params;

    const draft = await EFilingDraft.findOne({ draftId });

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Draft not found"
      });
    }

    await EFilingDraft.findOneAndDelete({ draftId });

    res.json({
      success: true,
      message: "Draft deleted successfully"
    });

  } catch (error) {
    console.error("Delete draft error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting draft"
    });
  }
});

// @route   POST /api/efiling/submit-draft/:draftId
// @desc    Submit a draft for processing (convert to actual filing)
// @access  Public (would typically require auth)
router.post("/submit-draft/:draftId", async (req, res) => {
  try {
    const { draftId } = req.params;

    const draft = await EFilingDraft.findOne({ draftId });

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Draft not found"
      });
    }

    if (draft.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: "Draft has already been submitted"
      });
    }

    // Update draft status
    draft.status = 'submitted';
    await draft.save();

    // Generate filing reference number
    const filingReference = `FL${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    res.json({
      success: true,
      message: "Draft submitted successfully",
      data: {
        filingReference,
        draftId: draft.draftId,
        status: draft.status,
        totalAmount: draft.totalAmount
      }
    });

  } catch (error) {
    console.error("Submit draft error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting draft"
    });
  }
});

module.exports = router;
