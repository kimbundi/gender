import express from "express"
import { addReport, getCaseStatus, listReports, removeReport,updateCaseStatus } from "../controllers/reportController.js"

import multer from "multer"


const reportRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }
})
const upload = multer({storage:storage})

reportRouter.post("/add",upload.single("image"),addReport)
reportRouter.get("/list",listReports)
reportRouter.post("/remove",removeReport);
reportRouter.post("/update",updateCaseStatus);
reportRouter.get("/status",getCaseStatus)





export default reportRouter;