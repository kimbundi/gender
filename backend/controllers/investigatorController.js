import investigatorModel from "../models/InvestigatorModel.js"

// 📌 Add Investigator
const addInvestigator = async (req, res) => {
    try {
        const { name, phone, location, caseType } = req.body;
        const lowerCaseType = caseType.toLowerCase();

        // Ensure phone number is unique
        const existingInvestigator = await investigatorModel.findOne({ phone });
        if (existingInvestigator) {
            return res.status(400).json({ success: false, message: "Phone number already exists" });
        }

        const investigator = new investigatorModel({
            name,
            phone,
            location,
            caseType: lowerCaseType // Use the lowercase version
        });

        await investigator.save();
        res.json({ success: true, message: "Investigator added successfully" });
    } catch (error) {
        console.error("Error adding investigator:", error);
        res.status(500).json({ success: false, message: "Error adding investigator" });
    }
};

// 📌 List Investigators
const listInvestigators = async (req, res) => {
    try {
        const { page = 1, limit = 10, caseType } = req.query;

        const query = {};
        if (caseType) query.caseType = caseType; // Filter by case type

        const investigators = await investigatorModel
            .find(query)
            .sort({ createdAt: -1 }) // Latest first
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalInvestigators = await investigatorModel.countDocuments(query);

        res.json({
            success: true,
            data: investigators,
            totalInvestigators,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalInvestigators / limit),
        });
    } catch (error) {
        console.error("Error fetching investigators:", error);
        res.status(500).json({ success: false, message: "Error fetching investigators" });
    }
};

// 📌 Remove Investigator
const removeInvestigator = async (req, res) => {
    try {
        await investigatorModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Investigator removed successfully" });
    } catch (error) {
        console.error("Error removing investigator:", error);
        res.status(500).json({ success: false, message: "Error removing investigator" });
    }
};

export { addInvestigator, listInvestigators, removeInvestigator };


