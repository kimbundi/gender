import Case from '../models/assignedModel.js';
import fs from 'fs';
import { validationResult } from 'express-validator';

// Add a new case with investigator details
const addCase = async (req, res) => {
    console.log("Received Data:", req.body);

    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }

    try {
        // Extract case details
        const { caseType, date, location, description, witnessDetails, confidentiality, investigator } = req.body;
        
        // If there's an uploaded file, get its filename
        const image_filename = req.file ? req.file.filename : null;
        
        // Extract investigator details if provided
        const investigatorDetails = investigator ? {
            name: investigator.name,
            phone: investigator.phone,
            caseType: investigator.caseType,
            location: investigator.location
        } : null;

        // Create a new case
        const caseReport = new Case({
            caseType,
            date,
            location,
            description,
            image: image_filename,  // Save filename or null if no file
            witnessDetails,
            confidentiality,
            status: "Pending",  // Default status
            investigator: investigatorDetails
        });

        // Save the case
        await caseReport.save();
        res.json({ success: true, message: "Case details added successfully" });
    } catch (error) {
        console.error("Error saving case:", error);
        res.status(500).json({ success: false, message: "Error saving case", error: error.message });
    }
};

// List cases with pagination and optional filters
const listCases = async (req, res) => {
    try {
        const { page = 1, limit = 10, caseType, status } = req.query;

        const query = {};
        if (caseType) query.caseType = caseType;
        if (status) query.status = status;

        // Fetch cases with pagination and sorting
        const cases = await Case.find(query)
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCases = await Case.countDocuments(query);

        res.json({
            success: true,
            data: cases,
            totalCases,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCases / limit),
        });
    } catch (error) {
        console.error("Error fetching cases:", error);
        res.status(500).json({ success: false, message: "Error fetching cases" });
    }
};

// Remove a case
const removeCase = async (req, res) => {
    try {
        const caseToRemove = await Case.findById(req.body.id);

        if (!caseToRemove) {
            return res.status(404).json({ success: false, message: "Case not found" });
        }

        // Remove associated image file if exists
        if (caseToRemove.image) {
            fs.unlink(`uploads/${caseToRemove.image}`, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        await Case.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Case removed successfully" });
    } catch (error) {
        console.error("Error removing case:", error);
        res.status(500).json({ success: false, message: "Error removing case" });
    }
};

// Update case status
const updateCaseStatus = async (req, res) => {
    try {
        const { reportId, status } = req.body;

        const validStatuses = ["Pending", "Under Investigation", "Resolved", "Closed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status update" });
        }

        const updatedCase = await Case.findByIdAndUpdate(reportId, { status }, { new: true });

        if (!updatedCase) {
            return res.status(404).json({ success: false, message: "Case not found" });
        }

        res.json({ success: true, message: "Case status updated", data: updatedCase });
    } catch (error) {
        console.error("Error updating case status:", error);
        res.status(500).json({ success: false, message: "Error updating case status" });
    }
};

export { addCase, listCases, removeCase, updateCaseStatus };
