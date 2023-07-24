
import mongoose, { Schema } from "mongoose";

const songsSchema = new Schema({
    userid: String,
    name: String,
    song: String,
    img: String,
    desc: String,
    movie: String,
    imgfilename: String,
    songfilename: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true ,suppressReservedWarning: true});

export const SONGS = mongoose.model("Songs", songsSchema);