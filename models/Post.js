import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({
    title: String,
    body: String,
    photo: String,
    video: String,
    type: String,
    filename: String,
    song: Object,
    location: String,
    save: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
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
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ]

}, { timestamps: true, suppressReservedWarning: true, suppressReservedKeysWarning: true  });

export const POST = mongoose.model("Post", postSchema);

