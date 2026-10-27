import { Router } from "express";
import { saveResponse , getMyForms , getFormResponses , getResponseDetail } from "./controllers.js";
import { authenticateFormViewer , authenticateUser } from "../middlewares/auth.middlewares.js";

const liveFormResponse = Router();

liveFormResponse.post("/save/:status" , authenticateFormViewer , saveResponse);

liveFormResponse.get("/my-forms" , authenticateUser , getMyForms); 
liveFormResponse.get("/form/:formId" , authenticateUser , getFormResponses);
liveFormResponse.get("/detail/:responseId" , authenticateUser , getResponseDetail); 

export default liveFormResponse;