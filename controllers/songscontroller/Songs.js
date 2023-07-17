import { serverLog } from "../../common/common.js";
import { SONGS } from "../../models/songs.js";

export const GetAllSongs = async (req, res) => {
    try {
        const songs = await SONGS.find();
        serverLog("songs", songs);

        res.status(200).json({ status: true, data: songs })
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

export const UploadSong = async (req, res) => {
    try {
        const song = await new SONGS(req.body.song).save();
        res.status(200).json({ status: true, data: song })
    } catch (err) {
        res.status(200).json({ status: false, message: err })
    }
}

