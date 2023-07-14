
import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { GetAllSongs, UploadSong } from "../../controllers/songscontroller/Songs.js";


// ==================================================================

export const SongsRouter = express.Router();

// =====================================================================
/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: User operations
 */

/**
 * @swagger
 * /allsongs:
 *   get:
 *     summary: allsongs
 *     description: allsongs
 *     tags: [Songs]
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
 * /uploadsong:
 *   post:
 *     summary: uploadsong
 *     description: uploadsong
 *     tags: [Songs]
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

// =====================================================================

SongsRouter.get("/allsongs", GetAllSongs);
SongsRouter.post("/uploadsong", VerifyToken, UploadSong);
