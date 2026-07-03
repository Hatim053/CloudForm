import { Router } from "express";
import { login } from './controller.js';

const authRoutes = Router();

authRoutes.get('/' , login);

export default authRoutes;