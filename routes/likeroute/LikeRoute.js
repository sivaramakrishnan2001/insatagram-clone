import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { GetAllLikes } from "../../controllers/likecontroller/LikeController.js";

export const LikeRouter = express.Router();

LikeRouter.get('/like/getAll', VerifyToken, GetAllLikes);
