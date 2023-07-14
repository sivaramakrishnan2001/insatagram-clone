import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { GetAllSavedPost } from "../../controllers/savecontroller/SaveController.js";

export const SaveRouter = express.Router();

// =====================================================================
/**
 * @swagger
 * tags:
 *   name: Save API
 *   description: User operations
 */

/**
 * @swagger
 * /save/getAll:
 *   get:
 *     summary: Get all save
 *     description: save
 *     tags: [Save API]
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

// =====================================================================

SaveRouter.get('/save/getAll', VerifyToken, GetAllSavedPost);
