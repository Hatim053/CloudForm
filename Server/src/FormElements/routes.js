import { Router } from "express";
import { createNewFormElement , createNewFormSkeleton } from "./controllers.js";
import { authenticateUser , requieAdmin } from "../middlewares/auth.js";

const formElementsRoutes = Router();

formElementsRoutes.post("/element" , authenticateUser , requieAdmin ,  createNewFormElement);
formElementsRoutes.post("/skeleton" , authenticateUser , requieAdmin , createNewFormSkeleton);

export default formElementsRoutes;
