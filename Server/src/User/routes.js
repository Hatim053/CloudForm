import { Router } from "express";
import { Signup , Login , Logout } from "./controllers.js";
import { authenticateUser } from "../middlewares/auth.js";

const userRoutes = Router();

userRoutes.get("/login" , Login);
userRoutes.get("/signup" , Signup);
userRoutes.get("/logout" , authenticateUser , Logout);

export default userRoutes;