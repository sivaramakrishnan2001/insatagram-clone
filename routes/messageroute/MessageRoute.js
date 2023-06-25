import express from "express";
import { VerifyToken } from "../../config/VerifyToken.js";
import { createMessage, getMessages } from "../../controllers/messagecontroller/MessageController.js";
export const MessageRouter = express.Router();

// ==================================================================
// Router

MessageRouter.post('/createMessage',createMessage);
MessageRouter.get('/getMessages/:from/:to', getMessages);



