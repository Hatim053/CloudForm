import { Router } from "express";
import { Signup , Login } from "./controllers.js";

const userRoutes = Router();

userRoutes.get("/login" , Login);
userRoutes.get("/signup" , Signup);

export default userRoutes;