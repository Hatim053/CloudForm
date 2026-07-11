import { Router } from "express";
import { renewAccessToken } from './controllers.js';

const authRoutes = Router();


authRoutes.get("/refresh" , renewAccessToken);

export default authRoutes;