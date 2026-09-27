import { Router }  from "express";
import { authenticateUser , requieAdmin } from "../middlewares/auth.middlewares.js";
import { createListData , fetchListData } from "./controllers.js";

const templatesCategoryListRoutes = Router();

templatesCategoryListRoutes.post("/create-data" , authenticateUser , requieAdmin , createListData);
templatesCategoryListRoutes.get("/fetch-data" ,   fetchListData);

export default templatesCategoryListRoutes;

