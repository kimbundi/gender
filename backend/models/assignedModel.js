import mongoose from "mongoose"

const investigatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    caseType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

const caseSchema = new mongoose.Schema({
    caseType: {
        type: String,
        required: true,
    },
    confidentiality: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: [String],  // An array of strings to hold image filenames or URLs
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Under Investigation", "Resolved", "Closed"],
        default: "Pending",
    },
    witnessDetails: {
        type: String,
        required: false,
    },
    investigator: {
        type: investigatorSchema, // Embedding the investigator schema here
        required: false,  // The investigator is optional; it can be added later
    }
}, { timestamps: true });

const Case =  mongoose.models.Case ||  mongoose.model("Case", caseSchema);

export default Case;
