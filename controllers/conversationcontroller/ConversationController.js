import { serverLog } from "../../common/common.js";
import { Conversation } from "../../models/conversation/Conversation.js";

const findIdValitation = (conversation1, userid, partnerid) => {
    console.log("conversation1", conversation1);
    let conversation = JSON.parse(JSON.stringify(conversation1));
    let status = false;
    for (let index = 0; index < conversation.length; index++) {
        const element = conversation[index];
        console.log("element", element.participants);
        let user_id_1 = element.participants[0].user._id;
        let user_id_2 = element.participants[1].user._id;

        console.log("user_id_1", user_id_1);
        console.log("user_id_2", user_id_2);


        if (user_id_1 === userid && user_id_2 === partnerid) {
            status = true;
            break;
        } else {
            status = false;
        }

        if (status === true) {
            break;
        }
    }


    console.log("status", status);
    return status;
}

const filterConversation = (conversation1, id) => {
    let conversation = JSON.parse(JSON.stringify(conversation1));
    let list = [];
    for (let index = 0; index < conversation.length; index++) {
        const element = conversation[index];
        for (let inx = 0; inx < element.participants.length; inx++) {
            const ele = element.participants[inx];
            if (ele.user._id === id) {
                list.push(element);
            }
        }
    }
    console.log("list", list);
    return list;
}


export const CreateConversation = async (req, res) => {
    const { conversationUserId } = req.body;
    serverLog("conversationUserId", conversationUserId)
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

    try {

        let id = JSON.parse(JSON.stringify(req.user))._id;

        // const conversation1 = await Conversation.find({ participants: { $in} })

        const conversation1 = await Conversation.find().populate({
            path: "participants", // populate blogs
            populate: {
                path: "user", // in blogs, populate comments
                select: "-password -followers -following"
            }
        });

        console.log("findIdValitation(conversation1, id)", findIdValitation(conversation1, id, conversationUserId));

        if (!findIdValitation(conversation1, id, conversationUserId)) {
            console.log("statsus true.............");
            const conversation = new Conversation({
                participants: participants,
                lastmessage: {},
                viewstatus: false,
                messagecount: 0
            }).save();
            console.log("conversation-------------->",conversation);
            if (conversation._id) {
                return res.status(200).json({ status: true, data: conversation });
            } else {
                return res.status(200).json({ status: false, data: conversation, message: "error" });
            }
        } else {
            return res.status(200).json({ status: false, data: {}, message: "user alredy excit" });
        }


    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}


export const GetAllConversation = async (req, res) => {
    try {
        console.log("sadasssssssssss=======>");
        const conversation = await Conversation.find();
        serverLog("69 conversation22", conversation);
        res.status(200).json({ status: true, data: conversation });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const DeleteAllConversation = async (req, res) => {
    try {
        const conversation = await Conversation.deleteMany();
        serverLog("conversation", conversation);

        res.status(200).json({ status: true, data: conversation });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}



export const GetConversation = async (req, res) => {
    try {
        console.log("?????????????=======>");
        const conversation = await Conversation.find().populate({
            path: "participants", // populate blogs
            populate: {
                path: "user", // in blogs, populate comments
                select: "-password -followers -following"
            }
        });

        let list = conversation.filter((i) => {

        })
        // const conversation = await Conversation.find();
        // serverLog("conversation22", conversation);
        // res.status(200).json({ status: true, data: conversation });

        // res.status(200).json({ status: true, data: list });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}
