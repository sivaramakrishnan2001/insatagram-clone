import express from "express";
import { CreateChat, GetChat } from "../../controllers/chatcontroller/ChatController.js";

export const ChatRouter = express.Router();

//===================================================================
//===================================================================

ChatRouter.post("/createChat", CreateChat);
ChatRouter.get('/getChat', GetChat);

