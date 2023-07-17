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
        const chat = await Message.create({
            sender: senderid,
            conversation: conversationid,
            content: obj
        });
        res.status(200).json({ status: true, data: chat });
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

