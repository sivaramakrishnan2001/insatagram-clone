import { serverLog } from "../../common/common.js";
import { StickyNotes } from "../../models/stickynotes/StickyNotes.js";



export const CreateStickyNotes = async (req, res) => {
    try {
        const { title, song } = req.body;

        const stickynotes = await StickyNotes.findOne({ "postedBy": req.user._id });

        console.log("stickynotes", stickynotes);
        if (!stickynotes) {
            const post = await StickyNotes.create({
                title: title,
                song: song,
                postedBy: req.user
            });
            if (post) {
                res.status(200).json({ status: true, data: post });
            }
        } else {
            res.status(200).json({ status: true, data: stickynotes });
        }

    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

export const GetAllStickyNotes = async (req, res) => {
    try {
        const stickynotes = await StickyNotes.find()
            .populate("song", "_id userid name song img desc movie")
            .populate("postedBy", "_id name email profile followers following profile")
            .populate({
                path: "postedBy",
                select: "-password",
                populate: {
                    path: "followers following",
                    select: "-password -followers -following -subscribers"
                }
            });
        serverLog("stickynotes", stickynotes);

        res.status(200).json({ status: true, data: stickynotes })
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

export const GetStickyNotes = async (req, res) => {
    try {
        serverLog("req.params.id", req.params.id);
        const stickynotes = await StickyNotes.findOne({ "postedBy": req.params.id })
            .populate("song", "_id userid name song img desc movie")
            .populate("postedBy", "_id name email profile followers following profile")
            .populate("postedBy.followers", "_id name email profile followers following profile")
            .populate("postedBy.following", "_id name email profile followers following profile");
        serverLog("stickynotes", stickynotes);
        res.status(200).json({ status: true, data: stickynotes });
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

export const DeleteAllStickyNotes = async (req, res) => {
    try {
        const stickynotes = await StickyNotes.deleteMany();
        res.status(200).json({ status: true, data: stickynotes })
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}


export const DeleteStickyNotes = async (req, res) => {

    try {
        console.log("stickynotes-----------", req.params.id);
        let stickynotes = await StickyNotes.findByIdAndDelete({ _id: req.params.id }).count();
        console.log("stickynotes1111-----------", stickynotes);
        if (stickynotes) {
            return res.status(200).json({ status: true, data: stickynotes });
        }
        return res.status(200).json({ status: false, data: {} });

    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}