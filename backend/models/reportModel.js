import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    caseType: {
        type: String,
        required: true,
        enum: ['fraud', 'harassment', 'accident', 'missing', 'rape', 'defilement', 'others']
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: [{
        type: String // Store file URLs or paths
    }],
    witnessDetails: {
        type: String,
        default: ""
    },
    confidentiality: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: { type: String, default: "Pending" },
    investigator: { type: mongoose.Schema.Types.ObjectId, ref: "Investigator" } // ✅ Fixed reference
});

const reportModel = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default reportModel;
