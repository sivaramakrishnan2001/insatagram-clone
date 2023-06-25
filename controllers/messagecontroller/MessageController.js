import { ChatSchema } from "../../models/chatmodel/ChatModel.js";
import { MessageModel } from "../../models/messagemodel/messageModel.js";


export const createMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body || req.query || req.params;

        const chat = await ChatSchema.find({
            members: {
                $all: [from, to]
            }
        });

        console.log("chat",chat);

        // const data = await MessageModel.create({
        //     message: message,
        //     chatusers: [from, to],
        //     sender: from
        // });


        // res.status(200).json({ status: true, data: data });

    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}



export const getMessages = async (req, res) => {
    try {
        const { from, to } = req.params;

        const messages = await MessageModel.find({
            chatusers: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });

        const allmsg = messages.map((msg) => {
            return {
                myself: msg.sender.toString() === from,
                message: msg.message
            }
        });
        res.status(200).json({ status: true, data: allmsg });

    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}