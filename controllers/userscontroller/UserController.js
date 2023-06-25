import { User } from "../../models/User.js";


export const GetUser = async (req, res) => {
    try {
        var id = req.params.id;
        if (id) {
            const user = await User.findById({ _id: id })
                .populate("followers", "_id name email profile followers following profile account category")
                .populate("following", "_id name email profile followers following profile account category")
                .sort('-createdAt');
            user.password = undefined;
            res.status(200).json({ status: true, data: user });
        } else {
            res.status(200).json({ status: false, message: "id null" });
        }


    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const GetUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate("followers", "_id name email profile followers following profile account category")
            .populate("following", "_id name email profile followers following profile account category")
            .sort('-createdAt');
        const data = users.map((i) => {
            const { _id, name, profile, followers, following, account, category } = i;
            return { _id, name, profile, followers, following, account, category }
        });
        res.status(200).json({ status: true, data: data });
    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const Follow = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const follow = await User.findByIdAndUpdate({ _id: req.body.id }, { $addToSet: { followers: req.user._id } }, { new: true });
        const following = await User.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { following: req.body.id } }, { new: true });
        res.status(200).json({ status: true, data: { follow, following } });
    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const UnFollow = async (req, res) => {
    try {
        const follow = await User.findByIdAndUpdate({ _id: req.body.id }, { $pull: { followers: req.user._id } }, { new: true });
        const following = await User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { following: req.body.id } }, { new: true });
        res.status(200).json({ status: true, data: { follow, following } });
    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const RemoveFollower = async (req, res) => {
    try {
        const remove = await User.findByIdAndUpdate({ _id: req.body.id }, { $pull: { followers: req.user._id } }, { new: true });
        res.status(200).json({ status: true, data: remove, message: "follower removed" });
    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}

export const GetProfile = async (req, res) => {
    try {
        const profile = await User.findOne({ _id: req.user._id })
            .populate("followers", "_id name email profile followers following profile account category")
            .populate("following", "_id name email profile followers following profile account category")
            .sort('-createdAt');
        res.status(200).json({ status: true, data: { profile } })
    } catch (err) {
        res.status(500).json({ status: false, message: "network error" });
    }
}

export const UpdateProfile = async (req, res) => {
    try {
        console.log(" req.body.profile = ", req.body.profile);
        const user = await User.findByIdAndUpdate(req.user._id, { profile: req.body.profile });
        res.status(200).json({ status: true, data: user });

    } catch (err) {
        res.status(500).json({ status: false, message: "network error" });
    }
}

