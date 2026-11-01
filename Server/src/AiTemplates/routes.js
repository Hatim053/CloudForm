import { Router } from "express";
import { generateTemplate } from "./controllers.js";
// adjust this path to the file that exports your auth middlewares
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const AiTemplateRoutes = Router();

// mount with : app.use("/ai-template" , aiTemplateRoutes);
// logged in creators only : every call costs free-tier quota , so strangers must not be able to use it
AiTemplateRoutes.post("/generate" , authenticateUser , generateTemplate); // POST /ai-template/generate  { prompt , current? }

export default AiTemplateRoutes;