import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { GetAllLikes } from "../../controllers/likecontroller/LikeController.js";

export const LikeRouter = express.Router();

// ==================================================================
/**
 * @swagger
 * tags:
 *   name: LIKES
 *   description: User operations
 */

/**
 * @swagger
 * /like/getAll:
 *   get:
 *     summary: get all like post
 *     description: get all like post
 *     tags: [LIKES]
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

LikeRouter.get('/like/getAll', VerifyToken, GetAllLikes);
