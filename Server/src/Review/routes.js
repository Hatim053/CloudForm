import { Router } from "express";
import { createReview, getReviews } from "./controllers.js";
import { get } from "mongoose";

const reviewRoutes = Router();

reviewRoutes.get("/get" , getReviews);
reviewRoutes.post("/create" , createReview);

export default reviewRoutes;