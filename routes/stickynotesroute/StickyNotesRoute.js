import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { CreateStickyNotes, DeleteAllStickyNotes, DeleteStickyNotes, GetAllStickyNotes, GetStickyNotes } from "../../controllers/stickynotes/StickyNotes.js";



export const StickyNotesRouter = express.Router();


/**
 * @swagger
 * /createStickyNotes:
 *   post:
 *     description: createStickyNotes
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
 *             title:
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

// =====================================================================

/**
 * @swagger
 * /getAllStickyNotes:
 *   get:
 *     description: createStickyNotes
 *     consumes:
 *          - application/json
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// =====================================================================
// =====================================================================
// =====================================================================

StickyNotesRouter.post("/createStickyNotes", VerifyToken, CreateStickyNotes);
StickyNotesRouter.get("/getAllStickyNotes", GetAllStickyNotes);
StickyNotesRouter.get("/getStickyNotes", VerifyToken, GetStickyNotes);
StickyNotesRouter.delete("/stickyNotes/delete/:id", VerifyToken, DeleteStickyNotes);
StickyNotesRouter.delete("/stickyNotes/delete/", VerifyToken, DeleteAllStickyNotes);

