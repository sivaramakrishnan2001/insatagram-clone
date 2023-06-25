import { POST } from "../../models/Post.js";
import { REELS } from "../../models/reels/Reels.js";

export const GetAllSavedPost = async (req, res) => {

    try {
        const posts = await POST.find();
        const reels = await REELS.find();
        const save = [];

        for (let index = 0; index < posts.length; index++) {
            const element = posts[index];
            if (element.save.includes(req.user._id)) {
                save.push(element);
            }
        }

        for (let index = 0; index < reels.length; index++) {
            const element = reels[index];
            if (element.save.includes(req.user._id)) {
                save.push(element);
            }
        }

        res.status(200).json({ status: true, data: save });

    } catch (err) {
        res.status(200).json({ status: false, message: err });
    }
}