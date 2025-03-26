import reportModel from "../models/reportModel.js";
import fs from 'fs';
import Case from "../models/assignedModel.js";
import mongoose from "mongoose";

// Add report details

const addReport = async (req, res) => {
    try {
        let image_filename = req.file ? req.file.filename : null; // Handle cases without an image

        // ✅ Create a new report
        const report = new reportModel({
            caseType: req.body.caseType,
            date: req.body.date,
            location: req.body.location,
            description: req.body.description,
            image: image_filename,
            witnessDetails: req.body.witnessDetails,
            confidentiality: req.body.confidentiality,
            status: "Pending",
        });

        // ✅ Save the report to MongoDB
        await report.save();

        // ✅ Automatically create a case in the Case collection
        const newCase = new Case({
            _id: report._id, // Use the same ID for consistency
            caseType: report.caseType,
            date: report.date,
            location: report.location,
            description: report.description,
            status: "Pending", // Default status
            investigator: null, // No investigator assigned yet
        });

        // ✅ Save the case
        await newCase.save();

        res.json({ success: true, message: "Report added and case created", reportId: report._id });

    } catch (error) {
        console.error("Error saving report:", error);
        res.status(500).json({ success: false, message: "Error saving report" });
    }
};
const getCaseStatus = async (req, res) => {
    try {
        const { reportId } = req.query;

        // Ensure reportId is valid
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return res.status(400).json({ success: false, message: "Invalid reportId" });
        }

        // Fetch the report and populate the investigator field
        const report = await reportModel.findById(reportId).populate("investigator");

        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        // Prepare response data
        let responseData = {
            caseType: report.caseType,
            date: report.date,
            location: report.location,
            description: report.description,
            image: report.image,
            witnessDetails: report.witnessDetails,
            confidentiality: report.confidentiality,
            status: report.status,
        };

        // Include investigator details if available
        if (report.investigator) {
            responseData.investigator = {
                name: report.investigator.name,
                phone: report.investigator.phone,
                location: report.investigator.location,
                caseType: report.investigator.caseType,
            };
        }

        res.json({ success: true, data: responseData });

    } catch (error) {
        console.error("Error fetching case details:", error);
        res.status(500).json({ success: false, message: "Error fetching case details" });
    }
};

//report 

const listReports = async (req,res)=>{
    try {
        const { page = 1, limit = 10, caseType, status } = req.query;

        const query = {};
        if (caseType) query.caseType = caseType;
        if (status) query.status = status; // Allow filtering by case status

        const reports = await reportModel
            .find(query)
            .sort({ date: -1 }) // Latest reports first
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalReports = await reportModel.countDocuments(query);

        res.json({
            success: true,
            data: reports,
            totalReports,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalReports / limit),
        });
    } catch (error) {
        console.log("Error fetching reports:", error);
        res.status(500).json({ success: false, message: "Error fetching reports" });
    }

}
//remove report item

const removeReport = async(req,res)=>{
    try {
        const report = await reportModel.findById(req.body.id);
        fs.unlink(`uploads/${report.image}`,()=>{})

        await reportModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"report details removed"})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }

}
const updateCaseStatus = async (req, res) => {
    try {
        const { reportId, status, investigator } = req.body;
        console.log("Received request body:", req.body);

        // ✅ Validate reportId
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            console.log("❌ Invalid reportId:", reportId);
            return res.status(400).json({ success: false, message: "Invalid reportId" });
        }

        console.log("✅ reportId is valid, proceeding...");

        // ✅ Validate status
        const validStatuses = ["Pending", "Under Investigation", "Resolved", "Closed"];
        if (!validStatuses.includes(status)) {
            console.log("❌ Invalid status:", status);
            return res.status(400).json({ success: false, message: "Invalid status update" });
        }

        console.log("✅ Status is valid, proceeding...");

        // ✅ Convert reportId to ObjectId
        const objectId = new mongoose.Types.ObjectId(reportId);

        // ✅ Check if case exists
        const existingCase = await Case.findById(objectId);
        if (!existingCase) {
            console.log("❌ Case not found in database (before update)");
            return res.status(404).json({ success: false, message: "Case not found" });
        }

        console.log("✅ Case found:", existingCase);

        // ✅ Prepare update object
        let updateFields = { status };

        // ✅ Check if investigator details are provided before updating them
        if (investigator && investigator.name && investigator.phone) {
            updateFields.investigator = {
                name: investigator.name,
                phone: investigator.phone,
                location: investigator.location,
                caseType: investigator.caseType
            };
        }

        // ✅ Update case status
        const updatedCase = await Case.findByIdAndUpdate(
            objectId, 
            { $set: updateFields }, 
            { new: true }
        );

        console.log("✅ Case updated successfully:", updatedCase);

        // ✅ Update report status in reportModel
        const updatedReport = await reportModel.findByIdAndUpdate(
            objectId, 
            { $set: { status } }, 
            { new: true }
        );

        console.log("✅ Report updated successfully:", updatedReport);

        res.json({ 
            success: true, 
            message: "Case and Report updated successfully", 
            caseData: updatedCase, 
            reportData: updatedReport 
        });

    } catch (error) {
        console.error("❌ Error updating case:", error);
        res.status(500).json({ success: false, message: "Error updating case", error: error.message });
    }
};


export { addReport,listReports,removeReport,updateCaseStatus,getCaseStatus };
