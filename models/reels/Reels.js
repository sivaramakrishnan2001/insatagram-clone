import mongoose, { Schema } from "mongoose";

const ReelsSchema = new Schema({
    title: String,
    url: String,
    desc: String,
    song: Object,
    location: String,
    type: String,
    filename: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    shares: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    save: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
}, { timestamps: true, suppressReservedWarning: true, suppressReservedKeysWarning: true });


export const REELS = mongoose.model("Reels", ReelsSchema);


