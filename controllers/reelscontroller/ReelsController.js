import { serverLog } from "../../common/common.js";
import { REELS } from "../../models/reels/Reels.js";

export const CreateReels = async (req, res) => {
    const { title,url, desc, song, location ,filename, type} = req.body;
    let id = JSON.parse(JSON.stringify(req.user))?._id;
    serverLog("CreateReels", { url, desc, song, location, id, title });
    try {
        if (!id) {
            return res.status(200).send({ status: false, message: "id value empty" });
        }
        const video = await REELS.create({
            title: title,
            url: url,
            desc: desc,
            song: song,
            location: location,
            type:type,
            filename:filename,
            postedBy: id,
            save: [],
            likes: [],
            comments: []
        });
        if (video) {
            res.status(200).send({ status: true, data: video });
        }

    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}

export const GetAllReels = async (req, res) => {
    try {

        const video = await REELS.find()
            .populate("postedBy", "_id name email profile followers following profile")
            .populate("likes", "_id name email profile followers following profile")
            .populate("postedBy", "_id name email profile followers following profile")
            .populate({
                path: "comments",
                select: "-password",
                populate: {
                    path: "postedBy",
                    select: "-password -followers -following -subscribers"
                }
            })
            .sort('-createdAt');
        serverLog("video", video);

        res.status(200).send({ status: true, data: video });

    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}

export const UpdateReels = async (req, res) => {
    try {
        const { reelsid, desc } = req.body;
        serverLog("reelsid", reelsid);

        const video = await REELS.findByIdAndUpdate({ _id: reelsid }, {
            $set: {
                desc: desc
            }
        }, { new: true, useFindAndModify: false });

        res.status(200).send({ status: true, data: video, message: "Successfully Updated" });

    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}

export const DeleteReels = async (req, res) => {
    try {
        const { reelsid } = req.body;
        serverLog("reelsid", reelsid);

        const video = await REELS.findByIdAndDelete({ _id: reelsid });
        serverLog("video", video);

        if (video) {
            res.status(200).send({ status: true, data: video, message: "Successfully Deleted" });
        } else {
            res.status(200).send({ status: false, message: "id not found" });
        }

    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}

export const LikeReels = async (req, res) => {
    serverLog("Like api req.body.postid", req.body.reelsid);
    let id = JSON.parse(JSON.stringify(req.user))._id;
    serverLog("Like api user id", id);

    try {
        if (!req.body.reelsid) {
            return res.status(200).json({ status: false, message: "reelsid value empty" });
        }
        if (!id) {
            return res.status(200).json({ status: false, message: "invalid token || token empty value" });
        }
        const reels = await REELS.findByIdAndUpdate({ _id: req.body.reelsid },
            { $addToSet: { likes: id } });

        res.status(200).json({ status: true, data: reels, test: req.user });
    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}


export const UnLikeReels = async (req, res) => {
    serverLog("UnLike api req.body.postid", req.body.reelsid);
    let id = JSON.parse(JSON.stringify(req.user))._id;
    serverLog("UnLike api user id", id);
    try {
        if (!req.body.reelsid) {
            return res.status(200).json({ status: false, message: "reelsid value empty" });
        }
        if (!id) {
            return res.status(200).json({ status: false, message: "invalid token || token empty value" });
        }
        const reels = await REELS.findByIdAndUpdate({ _id: req.body.reelsid },
            { $pull: { likes: id } }, {
            new: true
        });
        res.status(200).json({ status: true, data: reels });
    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}


export const CommentReels = async (req, res) => {

    const { postid, text } = req.body;
    const data = { text: text, postedBy: req.user._id };

    try {
        if (!postid) {
            return res.status(200).json({ status: false, message: "post id empty value", data: {} });
        }
        if (!data.text) {
            return res.status(200).json({ status: false, message: "text empty value", data: {} });
        }
        if (data.postedBy) {
            return res.status(200).json({ status: false, message: "invalid token || token empty value", data: {} });
        }

        const comment = await REELS.findByIdAndUpdate(
            { _id: postid },
            { $push: { comments: data } },
            { new: true, upsert: true }
        )

        console.log("comment", comment);
        if (comment) {
            res.status(200).json({ status: true, message: "successfully updated", data: comment })
        } else {
            res.status(200).json({ status: false, message: "error--", data: comment })
        }
    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}



