import express from "express";
import { addCase, listCases, removeCase, updateCaseStatus } from "../controllers/caseController.js";

import multer from "multer";

const caseRouter = express.Router();

// Image storage engine for file uploads
const storage = multer.diskStorage({
    destination: "uploads", // Folder where files will be stored
    filename: (req, file, cb) => {
        // Using the current timestamp and the original filename to avoid overwriting
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Add a new case (with optional file upload for case-related images)
caseRouter.post("/add", upload.single("image"), addCase);

// List cases with optional pagination, case type, and status filters
caseRouter.get("/list", listCases);

// Remove a case
caseRouter.post("/remove", removeCase);

// Update the status of an existing case
caseRouter.post("/update", updateCaseStatus);

// Optional: Get the case status for a specific case (this could be another route or the same)
caseRouter.get("/status", updateCaseStatus);

export default caseRouter;
