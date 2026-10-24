import { Router } from "express";
import { Login , Logout } from "./controllers.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const userRoutes = Router();

userRoutes.get("/login" , Login);
userRoutes.get("/logout" , authenticateUser , Logout);

export default userRoutes;