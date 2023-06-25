import { POST } from "../../models/Post.js";
import { REELS } from "../../models/reels/Reels.js";

export const GetAllLikes = async (req, res) => {

    try {
        const posts = await POST.find();
        const reels = await REELS.find();
        const likes = [];

        for (let index = 0; index < posts.length; index++) {
            const element = posts[index];
            if (element.likes.includes(req.user._id)) {
                likes.push(element);
            }
        }

        for (let index = 0; index < reels.length; index++) {
            const element = reels[index];
            if (element.likes.includes(req.user._id)) {
                likes.push(element);
            }
        }

        res.status(200).json({ status: true, data: likes });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}