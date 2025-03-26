import Case from '../models/assignedModel.js';
import fs from 'fs';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

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

const getCaseStatus = async (req, res) => {
    try {
        const { caseId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(caseId)) {
            return res.status(400).json({ success: false, message: "Invalid caseId" });
        }

        // ✅ Fetch case details and include investigator
        const caseData = await Case.findById(caseId).populate("investigator");

        if (!caseData) {
            return res.status(404).json({ success: false, message: "Case not found" });
        }

        // ✅ Prepare response data
        let responseData = {
            caseType: caseData.caseType,
            date: caseData.date,
            location: caseData.location,
            description: caseData.description,
            image: caseData.image,
            confidentiality: caseData.confidentiality,
            status: caseData.status,
        };

        // ✅ Include investigator details if available
        if (caseData.investigator) {
            responseData.investigator = {
                name: caseData.investigator.name,
                phone: caseData.investigator.phone,
                location: caseData.investigator.location,
                caseType: caseData.investigator.caseType,
            };
        }

        res.json({ success: true, data: responseData });

    } catch (error) {
        console.error("Error fetching case details:", error);
        res.status(500).json({ success: false, message: "Error fetching case details" });
    }
};


export { addCase, listCases, removeCase,getCaseStatus  };
