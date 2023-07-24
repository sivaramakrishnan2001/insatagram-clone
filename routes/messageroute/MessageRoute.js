import express from "express";
// import { VerifyToken } from "../../config/VerifyToken.js";
// import { createMessage, getMessages } from "../../controllers/messagecontroller/MessageController.js";
import { DeleteAllMessages, GetConversationAllMessages, createMessage, getAllMessages } from "../../controllers/messagecontroller/Message.js";
export const MessageRouter = express.Router();

// ==================================================================
// Router

// MessageRouter.post('/createMessage',createMessage);
// MessageRouter.get('/getMessages/:from/:to', getMessages);

// ==================================================================
// Message

/**
 * @swagger
 * /getAllMessages:
 *   get:
 *     summary: getAllMessages 
 *     description: getAllMessages 
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
 * /user/createMessages:
 *   post:
 *     summary: /user/createMessages
 *     description: /user/createMessages
 *     tags: [REALTIME Chat API]
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             senderid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             conversationid:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             text:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             imgUrl:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             videoUrl:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             file:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             filename:
 *               type: string
 *               required: true
 *               description: Request body parameters
 *             type:
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
 * /user/conversationMessages/{conversationId}:
 *   post:
 *     summary: /user/conversationMessages
 *     description: /user/conversationMessages
 *     tags: [REALTIME Chat API]
*      parameters:
 *        - in: path
 *          name: conversationId
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of user to delete
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

/**
 * @swagger
 * /deleteAllMessages:
 *   delete:
 *     summary: deleteAllMessages 
 *     description: deleteAllMessages 
 *     tags: [REALTIME Chat API]
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Error message
 */

// ==================================================================

MessageRouter.get('/getAllMessages', getAllMessages);
MessageRouter.post('/user/createMessages', createMessage);
MessageRouter.get('/user/getConversationMessages/:conversationId', GetConversationAllMessages);
MessageRouter.delete('/deleteAllMessages', DeleteAllMessages);




