import express from "express";
import { CreateReels, DeleteReels, GetAllReels, UpdateReels, CommentReels, LikeReels, UnLikeReels } from "../../controllers/reelscontroller/ReelsController.js";
import { VerifyToken } from "../../config/VerifyToken.js";

export const ReelsRouter = express.Router();


// =====================================================================
/**
 * @swagger
 * tags:
 *   name: REELS APIs
 *   description: reels apis
 */

/**
 * @swagger
 * /post/getAllReels:
 *   get:
 *     summary: Get all reels
 *     description: Get all reels
 *     tags: [REELS APIs]
 *     consumes:
 *          - application/json
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// =====================================================================

/**
 * @swagger
 * /post/createReels:
 *   post:
 *     summary: createReels
 *     description: createReels
 *     tags: [REELS APIs]
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
 *             desc:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             song:
 *               type: object
 *               required: true
 *               description: Request body parameters
 *             location:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// =====================================================================

/**
 * @swagger
 * /post/updateReels:
 *   put:
 *     summary: updateReels
 *     description: updateReels
 *     tags: [REELS APIs]
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
 *             reelsid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             desc:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */


// =====================================================================

/**
 * @swagger
 * /post/deleteReels:
 *   delete:
 *     summary: deleteReels
 *     description: deleteReels
 *     tags: [REELS APIs]
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
 *             reelsid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// =====================================================================


ReelsRouter.get("/post/getAllReels", GetAllReels);
ReelsRouter.post("/post/createReels", VerifyToken, CreateReels);
ReelsRouter.put("/post/updateReels", VerifyToken, UpdateReels);
ReelsRouter.delete("/post/deleteReels", VerifyToken, DeleteReels);

ReelsRouter.put('/post/likeReels', VerifyToken, LikeReels);
ReelsRouter.put('/post/unlikeReels', VerifyToken, UnLikeReels);
ReelsRouter.put('/post/commentReels', VerifyToken, CommentReels);
