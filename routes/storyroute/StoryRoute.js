import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { CreateStory, DeleteStory, GetAllStorys, LikeStory, UnlikeStory, ViewStory } from "../../controllers/story/StoryController.js";

export const StoryRouter = express.Router();

// ==================================================================
/**
 * @swagger
 * tags:
 *   name: Story APIs
 *   description: User operations
 */

/**
 * @swagger
 * /story/create:
 *   post:
 *     summary: create story
 *     description: create story
 *     tags: [Story APIs]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             location:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             type:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             filename:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             song:
 *               type: object
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /story/getAll:
 *   get:
 *     summary: getAll story
 *     description: getAll story
 *     tags: [Story APIs]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /story/delete:
 *   delete:
 *     summary: delete story
 *     description: delete story
 *     tags: [Story APIs]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             storyid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /story/like:
 *   put:
 *     summary: like story
 *     description: like story
 *     tags: [Story APIs]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             postid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /story/unlike:
 *   put:
 *     summary: unlike story
 *     description: unlike story
 *     tags: [Story APIs]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             postid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /story/view:
 *   put:
 *     summary: view story
 *     description: view story
 *     tags: [Story APIs]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: API authorization token
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             postid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

StoryRouter.post("/story/create", VerifyToken, CreateStory);
StoryRouter.get("/story/getAll", VerifyToken, GetAllStorys);
StoryRouter.delete("/story/delete", VerifyToken, DeleteStory);
StoryRouter.put("/story/like", VerifyToken, LikeStory);
StoryRouter.put("/story/unlike", VerifyToken, UnlikeStory);
StoryRouter.put("/story/view", VerifyToken, ViewStory);





