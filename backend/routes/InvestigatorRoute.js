import express from "express"

import { addInvestigator,removeInvestigator,listInvestigators } from "../controllers/investigatorController.js";

const investigatorRouter = express.Router();

investigatorRouter.post("/add",addInvestigator)
investigatorRouter.get("/list",listInvestigators)
investigatorRouter.post("/remove",removeInvestigator);
export default investigatorRouter;