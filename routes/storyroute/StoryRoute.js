import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { CreateStory, DeleteStory, GetAllStorys, LikeStory, UnlikeStory } from "../../controllers/story/StoryController.js";

export const StoryRouter = express.Router();

StoryRouter.post("/story/create", VerifyToken, CreateStory);
StoryRouter.get("/story/getAll", VerifyToken, GetAllStorys);
StoryRouter.get("/story/delete", VerifyToken, DeleteStory);
StoryRouter.put("/story/like", VerifyToken, LikeStory);
StoryRouter.put("/story/unlike", VerifyToken, UnlikeStory);




