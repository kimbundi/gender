import mongoose from "mongoose";

const investigatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate phone numbers
    },
    location: {
        type: String,
        required: true,
    },
    caseType: {
        type: String,
        required: true,
        enum: ['fraud', 'harassment', 'accident', 'missing', 'rape', 'defilement', 'others']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const investigatorModel = mongoose.models.Investigator || mongoose.model("Investigator", investigatorSchema);

export default investigatorModel;
