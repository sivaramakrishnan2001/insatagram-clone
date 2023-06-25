import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { GetAllSavedPost } from "../../controllers/savecontroller/SaveController.js";

export const SaveRouter = express.Router();

SaveRouter.get('/save/getAll', VerifyToken, GetAllSavedPost);
