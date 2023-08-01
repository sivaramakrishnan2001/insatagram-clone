import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { CreateConversation, DeleteAllConversation, GetAllConversation, GetConversation } from "../../controllers/conversationcontroller/ConversationController.js";

export const ConversationRouter = express.Router();

// ==================================================================
/**
 * @swagger
 * tags:
 *   name: REALTIME Chat API
 *   description: User operations
 */

/**
 * @swagger
 * /getAllConversation:
 *   get:
 *     summary: GetConversation users
 *     description: GetConversation users
 *     tags: [REALTIME Chat API]
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /deleteAllConversation:
 *   delete:
 *     summary: deleteAllConversation 
 *     description: deleteAllConversation 
 *     tags: [REALTIME Chat API]
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /user/createConversation:
 *   post:
 *     summary: createConversation
 *     description: createConversation
 *     tags: [REALTIME Chat API]
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
 *             conversationUserId:
 *               type: string
 *         required: true
 *         description: Request body parameters
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /user/GetConversation:
 *   get:
 *     summary: user GetConversation
 *     description: user GetConversation
 *     tags: [REALTIME Chat API]
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

ConversationRouter.get('/getAllConversation', GetAllConversation);
ConversationRouter.get('/user/Conversation/getAll', VerifyToken, GetConversation)
ConversationRouter.delete('/deleteAllConversation', DeleteAllConversation);
ConversationRouter.post('/user/createConversation', VerifyToken, CreateConversation);



