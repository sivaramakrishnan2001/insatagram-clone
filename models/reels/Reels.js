import mongoose, { Schema } from "mongoose";

const ReelsSchema = new Schema({
    url: String,
    desc: String,
    song: {},
    location: String,
    filename:String,
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
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            text: String,
            postedBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
}, { timestamps:true });


export const REELS = mongoose.model("Reels", ReelsSchema);


