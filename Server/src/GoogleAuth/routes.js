import { Router } from "express";
import { Signup } from './controller.js';

const authRoutes = Router();

authRoutes.get('/' , Signup);

export default authRoutes;