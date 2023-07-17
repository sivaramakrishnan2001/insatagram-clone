import { POST } from "../../models/Post.js";



export const CreatePost = async (req, res) => {
    const { photo, body, title, song, location, type, filename, video } = req.body;

    try {
        serverLog("CreatePost",{ photo, body, title, song, location, type, filename, video });

        const post = await POST.create({
            title: title,
            body: body,
            photo: photo,
            video: video,
            filename: filename,
            type: type,
            song: song,
            location: location,
            save: [],
            likes: [],
            comments: [],
            postedBy: req.user
        });

        if (post) {
            res.status(200).send({ status: true, data: post });
        }

    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}

export const GetAllPost = async (req, res) => {
    try {
        const posts = await POST.find()
            .populate("postedBy", "_id name email profile followers following profile")
            .populate("comments.postedBy", "_id name email profile followers following profile")
            .populate({
                path: "likes",
                select: "-password",
                populate: {
                    path: "followers following",
                    select: "-password -followers -following -subscribers"
                }
            })
            .sort('-createdAt');
            serverLog("posts",posts);

        res.status(200).json({ data: posts, status: true });

    } catch (err) {
        res.status(500).json({ message: err, status: false });
    }
}

export const GetUserPost = async (req, res) => {

    try {
        const posts = await POST.find({ postedBy: req.params.userId })
            .populate("postedBy", "_id name email profile followers following profile")
            .populate("likes", "_id name email profile followers following profile")
            .populate("comments.postedBy", "_id name email profile followers following profile")
            .sort('-createdAt');
        res.status(200).json({ data: posts, status: true });

    } catch (err) {
        res.status(500).json({ message: err, status: false });
    }
}



export const Like = async (req, res) => {
    serverLog("req.body.postid",req.body.postid);

    try {
        const post = await POST.findByIdAndUpdate({ _id: req.body.postid },
            { $addToSet: { likes: req.user } });

        res.status(200).json({ status: true, data: post, test: req.user })
    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}


export const UnLike = async (req, res) => {
    try {
        const post = await POST.findByIdAndUpdate({ _id: req.body.postid },
            { $pull: { likes: req.body.userid } }, {
            new: true
        });
        res.status(200).json({ status: true, data: post });
    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}


export const DeletePost = async (req, res) => {
    try {
        const post = await POST.findOne({ _id: req.body.postid }).populate("postedBy", "_id ");
        const deletepost = await POST.findByIdAndDelete({ _id: req.body.postid });
        res.status(200).json({ status: true, message: "your post successfully deleted.", data: deletepost })
    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}

export const Comment = async (req, res) => {

    const { postid, text } = req.body;
    const data = { text: text, postedBy: req.user._id };
    try {

        console.log("comment1");

        const comment = await POST.findByIdAndUpdate(
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




export const Save = async (req, res) => {
    try {
        const post = await POST.findByIdAndUpdate({ _id: req.body.postId },
            { $addToSet: { save: req.user._id } });

        console.log("postsave", post);

        if (post) {
            res.status(200).json({ status: true, data: post, message: "successfully saved" });
        }

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const UnSave = async (req, res) => {
    try {
        const post = await POST.findByIdAndUpdate({ _id: req.body.postId },
            { $pull: { save: req.user._id } }, {
            new: true
        });
        console.log("post", post);
        if (post) {
            res.status(200).json({ status: true, data: { post } });
        } else {
            res.status(200).json({ status: true, message: "error" });
        }
    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}


