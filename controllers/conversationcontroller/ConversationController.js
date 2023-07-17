import { Conversation } from "../../models/conversation/Conversation.js";


export const CreateConversation = async (req, res) => {
    const { conversationUserId } = req.body;
    console.log("conversationUserId", conversationUserId);
    const participants = [
        {
            user: req.user,
            id: "user_id_1",
        },
        {
            user: conversationUserId,
            id: "user_id_2",
        }
    ];

    console.log("participants", participants);
    try {
        const conversation = await Conversation.create({
            participants: participants
        });
        if (conversation) {
            res.status(200).json({ status: true, data: conversation });
        } else {
            res.status(200).json({ status: false, data: conversation, message: "error" });
        }
    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}


export const GetAllConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find();
        console.log("conversation", conversation);
        res.status(200).json({ status: true, data: conversation });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const DeleteAllConversation = async (req, res) => {
    try {
        const conversation = await Conversation.deleteMany();
        console.log("conversation", conversation);
        res.status(200).json({ status: true, data: conversation });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}



export const GetConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find(
        );
        console.log("conversation", conversation);
        res.status(200).json({ status: true, data: conversation });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}
