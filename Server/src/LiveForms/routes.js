import { Router } from "express";
import { getFormData , getAllUserFormsList , showLiveForm , createForm } from "./controllers.js";
import { authenticateFormViewer , authenticateUser } from "../middlewares/auth.middlewares.js";

const liveFormsRoutes = Router();

liveFormsRoutes.get("form/:formId" , authenticateUser , getFormData);
liveFormsRoutes.get("/allforms" , authenticateUser , getAllUserFormsList);
liveFormsRoutes.get("/show/:formId/status=:status" , authenticateFormViewer , showLiveForm);
liveFormsRoutes.post("/create" , authenticateUser , createForm);
export default liveFormsRoutes;
