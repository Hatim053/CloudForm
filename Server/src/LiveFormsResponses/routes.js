import { Router } from "express";
import { saveResponse , getMyForms , getFormResponses , getResponseDetail } from "./controllers.js";
import { authenticateFormViewer , authenticateUser } from "../middlewares/auth.middleware.js";

const liveFormResponse = Router();

router.post("/save/:status" , authenticateFormViewer , saveResponse);

router.get("/my-forms" , authenticateUser , getMyForms); 
router.get("/form/:formId" , authenticateUser , getFormResponses);
router.get("/detail/:responseId" , authenticateUser , getResponseDetail); 

export default liveFormResponse;