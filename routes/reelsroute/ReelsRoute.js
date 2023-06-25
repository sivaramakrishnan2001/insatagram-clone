import express from "express";
import { CreateReels, DeleteReels, GetAllReels, UpdateReels } from "../../controllers/reelscontroller/ReelsController.js";
import { VerifyToken } from "../../config/VerifyToken.js";

export const ReelsRouter = express.Router();

ReelsRouter.get("/post/getAllReels", GetAllReels);
ReelsRouter.post("/post/createReels", VerifyToken, CreateReels);
ReelsRouter.post("/post/updateReels", VerifyToken, UpdateReels);
ReelsRouter.delete("/post/deleteReels", VerifyToken, DeleteReels);
