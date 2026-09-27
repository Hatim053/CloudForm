import { Router } from "express";
import { requieAdmin , authenticateUser } from "../middlewares/auth.middlewares.js";
import { createPreviewData , fetchPreviewData } from "./controllers.js";

const templatePreviewDataRoutes = Router();

templatePreviewDataRoutes.post("/create-data" , authenticateUser , requieAdmin , createPreviewData);
templatePreviewDataRoutes.get("/fetch-data" , fetchPreviewData);

export default templatePreviewDataRoutes;
