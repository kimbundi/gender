import reportModel from "../models/reportModel.js";
import fs from 'fs';

// Add report details
const addReport = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`;

        const report = new reportModel({
            caseType: req.body.caseType,
            date: req.body.date,
            location: req.body.location,
            description: req.body.description,
            image: image_filename, // Save filename or null
            witnessDetails: req.body.witnessDetails,
            confidentiality: req.body.confidentiality,
            status: "Pending",
        });

        await report.save();
        res.json({ success: true, message: "Report details added", reportId: report._id });
    } catch (error) {
        console.error("Error saving report:", error);
        res.status(500).json({ success: false, message: "Error saving report" });
    }
};
const  getCaseStatus = async (req, res) => {
    try {
        const { reportId } = req.query;

        const report = await reportModel.findById(reportId);

        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        res.json({ 
            success: true, 
            data: {
                caseType: report.caseType,
                date: report.date,
                location: report.location,
                description: report.description,
                image: report.image,
                witnessDetails: report.witnessDetails,
                confidentiality: report.confidentiality,
                status: report.status
            }
        });
    } catch (error) {
        console.log("Error fetching case details:", error);
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
        const { reportId, status } = req.body;

        const validStatuses = ["Pending", "Under Investigation", "Resolved", "Closed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status update" });
        }

        const updatedReport = await reportModel.findByIdAndUpdate(reportId, { status }, { new: true });

        if (!updatedReport) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        res.json({ success: true, message: "Case status updated", data: updatedReport });
    } catch (error) {
        console.log("Error updating status:", error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};




export { addReport,listReports,removeReport,updateCaseStatus,getCaseStatus };
