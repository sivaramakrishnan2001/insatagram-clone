import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { CreateStickyNotes, DeleteAllStickyNotes, DeleteStickyNotes, GetAllStickyNotes, GetStickyNotes } from "../../controllers/stickynotes/StickyNotes.js";



export const StickyNotesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: StickyNotes
 *   description: User operations
 */

/**
 * @swagger
 * /createStickyNotes:
 *   post:
 *     summary: createStickyNotes
 *     description: save
 *     tags: [StickyNotes]
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
 *     tags: [StickyNotes]
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
 * 
 * @swagger
 * /getStickyNotes/{id}:
 *  get:
 *      description: getStickyNotes
 *      tags: [StickyNotes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string 
 *      responses:
 *          200:
 *              description: 
 */

// =====================================================================

/**
 * 
 * @swagger
 * /stickyNotes/delete/{id}:
 *  delete:
 *      description: delete
 *      tags: [StickyNotes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: delete 
 *      responses:
 *          200:
 *              description: 
 */

// =====================================================================

/**
 * 
 * @swagger
 * /stickyNotes/delete/:
 *  delete:
 *      tags: [StickyNotes]
 *      responses:
 *          200:
 *              description: 
 */

// =====================================================================


StickyNotesRouter.post("/createStickyNotes", VerifyToken, CreateStickyNotes);
StickyNotesRouter.get("/getAllStickyNotes", GetAllStickyNotes);
StickyNotesRouter.get("/getStickyNotes/:id", VerifyToken, GetStickyNotes);
StickyNotesRouter.delete("/stickyNotes/delete/:id", VerifyToken, DeleteStickyNotes);
StickyNotesRouter.delete("/stickyNotes/delete/", VerifyToken, DeleteAllStickyNotes);

