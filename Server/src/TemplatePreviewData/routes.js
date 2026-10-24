import { Router } from "express";
import { requieAdmin , authenticateUser } from "../middlewares/auth.middlewares.js";
import { createPreviewData , fetchPreviewData , updatePreviewData } from "./controllers.js";

const templatePreviewDataRoutes = Router();

templatePreviewDataRoutes.post("/create-data" , authenticateUser , requieAdmin , createPreviewData);
templatePreviewDataRoutes.get("/fetch-data/:templateId" , fetchPreviewData);
templatePreviewDataRoutes.put("/update-data/:templateId" , authenticateUser , requieAdmin , updatePreviewData);

export default templatePreviewDataRoutes;
