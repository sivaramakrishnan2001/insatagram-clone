import { POST } from "../../models/Post.js";



export const CreatePost = async (req, res) => {
    const { photo, body, title, song, location, type, filename, video } = req.body;

    try {
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

    try {
        const { password, ...others } = req.user._doc;
        const post = await POST.findByIdAndUpdate({ _id: req.body.postid },
            { $addToSet: { likes: others } });

        res.status(200).json({ status: true, data: post, test: others })
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
    try {
        const { postid,text } = req.body;
        const data = { text: text, postedBy: req.user._id };
        const comment = await POST.findByIdAndUpdate({ _id: postid }, {
            $push: { comments: data }
        }, { new: true }).populate("comments.postedBy", "_id name profile followers follwing");
        console.log("comment", comment);

        res.status(200).json({ status: true, message: "successfully updated", data: comment })
    } catch (err) {
        res.status(200).send({ status: false, message: err });
    }
}




export const Save = async (req, res) => {
    try {
        const post = await POST.findByIdAndUpdate({ _id: req.body.postId },
            { $addToSet: { save: req.user._id } });

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
        if (post) {
            res.status(200).json({ status: true, data: { post } });
        } else {
            res.status(200).json({ status: true, message: "error" });
        }
    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}


