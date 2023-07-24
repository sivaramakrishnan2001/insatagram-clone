import { Conversation } from "../../models/conversation/Conversation.js";
import { Message } from "../../models/message/Message.js";



export const createMessage = async (req, res) => {
    const { text, imgUrl, videoUrl, file, filename, type, senderid, conversationid } = req.body || req.query || req.params;
    const obj = {
        text: text || '',
        imgUrl: imgUrl || '',
        videoUrl: videoUrl || '',
        file: file || '',
        filename: filename || '',
        type: type || '',
    };

    try {
        const conversation = await Conversation.findByIdAndUpdate({ _id: conversationid }, { lastmessage: obj })
        const chat = await Message.create({
            sender: senderid,
            conversation: conversationid,
            content: obj
        });
        if (conversation && chat) {
            res.status(200).json({ status: true, data: chat });
        }else{
            res.status(200).json({ status: false, data: chat });
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}



export const GetConversationAllMessages = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const messages = await Message.find({ conversation: conversationId })
        res.status(200).json({ status: true, data: messages });
    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}


export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        res.status(200).json({ status: true, data: messages });
    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}


export const DeleteAllMessages = async (req, res) => {
    try {
        const messages = await Message.deleteMany();
        res.status(200).json({ status: true, data: messages });
    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}

