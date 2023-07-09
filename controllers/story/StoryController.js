import { OldDateTimeConvert } from "../../common/common.js";
import { STORY } from "../../models/story/Story.js";


export const CreateStory = async (req, res) => {
    try {
        const { url, song, location, type, filename } = req.body;
        const story = await STORY.create({
            url: url,
            song: song,
            location: location,
            postedBy: req.user,
            filename: filename,
            type: type,
            likes: [],
            viewers: [],
        });
        console.log("story", story);
        if (story) {
            res.status(200).send({ status: true, data: story });
        }
    }
    catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}


export const UpdateStoryViewers = async (req, res) => {
    try {
        const storys = await STORY.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { viewers: req.user._id } });
        res.status(200).json({ status: true, data: storys });
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

export const LikeStory = async (req, res) => {
    try {
        const storys = await STORY.findByIdAndUpdate({ _id: req.body.postid },
            { $addToSet: { likes: req.user._id } });
        if (storys) {
            res.status(200).json({ status: true, data: storys });
        } else {
            res.status(200).json({ status: false, data: storys });
        }

    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

export const UnlikeStory = async (req, res) => {
    try {
        const storys = await STORY.findByIdAndUpdate({ _id: req.body.postid }, { $pull: { likes: req.user._id } });
        if (storys) {
            res.status(200).json({ status: true, data: storys });
        } else {
            res.status(200).json({ status: false, data: storys });
        }
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}


export const GetAllStorys = async (req, res) => {
    console.log("req", req.user._id);
    try {
        let userid = JSON.stringify(req.user._id) || "";
        let list = await STORY.find()
            .populate("song", "_id userid name song img desc movie")
            .populate("viewers", "_id name email profile followers following profile")
            .populate({
                path: "postedBy",
                select: "-password",
                populate: {
                    path: "followers following",
                    select: "-password -followers -following -subscribers"
                }
            });
        let storys = [];
        for (let index = 0; index < list.length; index++) {
            const element = array[index];
            const datetime = OldDateTimeConvert(element.updatedAt);
            if (datetime.days <= 1) {
                storys.push(element);
            }
        }

        const ids = [];
        const userstorys = new Array();

        storys.map((i) => {
            i.isplay = false
            i.time = OldDateTimeConvert(i.updatedAt)
            return i;
        });
        // console.log("storys", storys);

        for (let index = 0; index < storys.length; index++) {
            const story = storys[index];
            if (!ids.includes(story.postedBy._id)) {
                ids.push(story.postedBy._id);
            }
        }

        for (let index = 0; index < ids.length; index++) {
            userstorys[index] = {};
            userstorys[index].storys = [];
            userstorys[index].user = {};
        }

        for (let i = 0; i < storys.length; i++) {
            const duplicatestory1 = storys[i];
            for (let ii = 0; ii < ids.length; ii++) {
                const id = ids[ii];
                const userstory = userstorys[ii];
                if (id === duplicatestory1._doc.postedBy._id) {
                    userstory.storys.push(duplicatestory1);
                    userstory.user = duplicatestory1.postedBy;
                }
            }
        }

        let first_user_story = [];
        let user = {};

        for (let index = 0; index < userstorys.length; index++) {
            const element = userstorys[index];
            if (userid === JSON.stringify(element.user._id)) {
                user = element;
            } else {
                first_user_story.push(element);
            }
        }

        first_user_story.unshift(user)


        res.status(200).json({ status: true, data: first_user_story, dummy: first_user_story });
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

export const DeleteStory = async (req, res) => {
    try {
        const story = await STORY.deleteOne({ "postedBy": req.user._id });
        res.status(200).json({ status: true, data: story })
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}