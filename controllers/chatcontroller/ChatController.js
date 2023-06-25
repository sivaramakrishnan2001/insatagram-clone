import { ChatSchema } from "../../models/chatmodel/ChatModel.js";


export const CreateChat = async (req, res) => {
    try {
        const { from, to, profile, name } = req.body;
        const newchat = await new ChatSchema({
            members: [from, to],
            profile: profile,
            lastMessage: "",
            name: name
        }).save();
        res.status(200).json({ status: true, data: newchat });

    } catch (err) {
        res.status(500).json({ status: false, message: err });
    }
}


export const GetChat = async (req, res) => {
    try {
        const { from } = req.body || req.params || req.query;

        const chat = await ChatSchema.findOne({
            members: { $in: [from] }
        });

        res.status(200).json({ status: true, data: chat });

    } catch (err) {
        res.status(500).json({ status: false, message: err });
    }
}