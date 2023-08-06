import { Conversation } from "../../models/conversation/Conversation.js";
import { Message } from "../../models/message/Message.js";



export const createMessage = async (req, res) => {
    const { text, imgUrl, videoUrl, file, filename, type, conversationid } = req.body || req.query || req.params;
    console.log("text, imgUrl, videoUrl, file, filename, type, conversationid", text, imgUrl, videoUrl, file, filename, type, conversationid);
    let obj = {
        text: text,
        imgUrl: imgUrl,
        videoUrl: videoUrl,
        file: file,
        filename: filename,
        type: type,
    };

    let senderid = JSON.parse(JSON.stringify(req.user))?._id;
    console.log("senderid", senderid);

    try {
        const conversation = await Conversation.findByIdAndUpdate({ _id: conversationid }, { lastmessage: obj }, { new: true, upsert: true });
        console.log("conversation--->", conversation);
        console.log("conversationid--->", conversationid);
        const chat = new Message({
            sender: senderid,
            conversation: conversationid,
            content: obj,
        });

        await chat.save();
        console.log("chat", chat);
        if (conversation && chat) {
            return res.status(200).json({ status: true, data: chat });
        } else {
            return res.status(200).json({ status: false, data: chat, message: "conversation || chat empty value" });
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err });
    }
}



export const GetConversationAllMessages = async (req, res) => {
    const { conversationId } = req.params;
    let senderid = JSON.parse(JSON.stringify(req.user))?._id;

    console.log("conversationId>>>>>>>>>", conversationId);

    try {
        const messages = await Message.find({ conversation: conversationId })
            .populate("conversation")
            .populate('sender', '-password')
            .populate('post')
            .populate({
                path: 'reels',
                populate: {
                    path: 'comments',
                    populate: {
                        path: 'postedBy',
                    }
                }
            })


        // let isNew = messages.map((row) => {

        //     return {
        //         text: row.content.text || "",
        //         imgUrl: row.content.imgUrl || "",
        //         videoUrl: row.content.videoUrl || "",
        //         file: row.content.file || "",
        //         filename: row.content.filename || "",
        //         type: row.content.type || "",
        //         sender: row.sender || ""
        //     }
        // });

        // console.log("isNew", isNew);


        res.status(200).json({ status: true, data: messages, });
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

export const SendReels = async (req, res) => {
    const { conversationid, reelsid } = req.body;
    let senderid = JSON.parse(JSON.stringify(req.user))?._id;

    try {
        console.log("conversationid", conversationid);
        console.log("senderid", senderid);
        console.log("reelsid", reelsid);

        console.log("req.body", req.body);

        if (!senderid) {
            return res.status(200).json({ status: false, data: {}, message: "senderid empty value" });
        }

        if (!conversationid) {
            return res.status(200).json({ status: false, data: {}, message: "conversationid empty value", error: conversationid });
        }

        if (!reelsid) {
            return res.status(200).json({ status: false, data: {}, message: "reelsid empty value" });
        }




        const chat = new Message({
            sender: senderid,
            conversation: conversationid,
            content: {},
            reels: reelsid,
        })

        await chat.save();

        if (!chat) {
            return res.status(200).json({ status: false, data: chat, message: "technical error" });
        }

        res.status(200).json({ status: true, data: chat });


    } catch (err) {
        res.status(500).send({ status: false, message: err, error: "technical error" });
    }
}


export const SendPost = async (req, res) => {
    const { conversationid, postid } = req.body || req.query || req.params;
    let senderid = JSON.parse(JSON.stringify(req.user))?._id;

    try {

        if (!senderid) {
            return res.status(200).json({ status: false, data: {}, message: "senderid empty value" });
        }

        if (!conversationid) {
            return res.status(200).json({ status: false, data: {}, message: "conversationid empty value" });
        }

        if (!postid) {
            return res.status(200).json({ status: false, data: {}, message: "postid empty value" });
        }

        const chat = await new Message({
            sender: senderid,
            conversation: conversationid,
            content: {},
            reels: {},
            post: postid,
        }).save();

        if (!chat) {
            return res.status(200).json({ status: false, data: chat, message: "technical error" });
        }

        res.status(200).json({ status: true, data: chat });


    } catch (err) {
        res.status(500).send({ status: false, message: err, error: "technical error" });
    }
}


