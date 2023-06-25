import { REELS } from "../../models/reels/Reels.js";

export const CreateReels = async (req, res) => {
    try {
        const { url, desc, song, location } = req.body;
        console.log("CreateReels....");
        const video = await REELS.create({
            url: url,
            desc: desc,
            song: song,
            location: location,
            save: [],
            likes: [],
            comments: [],
            postedBy: req.user
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
            .populate("comments.postedBy", "_id name email profile followers following profile")
            .sort('-createdAt');

        res.status(200).send({ status: true, data: video });

    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}

export const UpdateReels = async (req, res) => {
    try {
        const { reelsid, desc } = req.body;

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

        const video = await REELS.findByIdAndDelete({ _id: reelsid });
        if (video) {
            res.status(200).send({ status: true, data: video, message: "Successfully Deleted" });
        } else {
            res.status(200).send({ status: false, message: "id not found" });
        }

    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}



