import { Router } from "express";
import { requieAdmin , authenticateUser } from "../middlewares/auth.middlewares.js";
import { fetchPlatformAnalytics } from "./controllers.js";

const adminRoutes = Router();

adminRoutes.get("/fetch-platform-analytics" , authenticateUser , requieAdmin , fetchPlatformAnalytics);


export default adminRoutes;